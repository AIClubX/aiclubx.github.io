import { DatabaseClient } from '../types';
import { logger } from '../../../utils/logger';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runMigrations(client: DatabaseClient): Promise<void> {
  try {
    // Create migrations table if it doesn't exist
    await client.execute(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        executed_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    // Get list of executed migrations
    const executed = await client.query<{ name: string }>('SELECT name FROM migrations');
    const executedMigrations = new Set(executed.map(row => row.name));

    // Read migration files
    const migrationFiles = fs.readdirSync(__dirname)
      .filter(file => file.endsWith('.sql'))
      .sort();

    // Execute migrations
    for (const file of migrationFiles) {
      if (!executedMigrations.has(file)) {
        logger.info(`Running migration: ${file}`);
        
        const sql = fs.readFileSync(path.join(__dirname, file), 'utf8');
        
        await client.transaction(async (tx) => {
          // Split and execute multiple statements
          const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

          for (const statement of statements) {
            await tx.execute(statement);
          }

          // Record migration
          await tx.execute(
            'INSERT INTO migrations (name) VALUES (?)',
            [file]
          );
        });

        logger.info(`Completed migration: ${file}`);
      }
    }

    logger.info('All migrations completed successfully');
  } catch (error) {
    logger.error('Migration failed:', error);
    throw error;
  }
}