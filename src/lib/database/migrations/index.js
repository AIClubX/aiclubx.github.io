import { createClient } from '@libsql/client';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  try {
    // Ensure data directory exists
    const dataDir = join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    const client = createClient({
      url: 'file:data/local.db'
    });

    // Create migrations table if it doesn't exist
    await client.execute(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Get list of executed migrations
    const executed = await client.execute('SELECT name FROM migrations');
    const executedMigrations = new Set(executed.rows.map(row => row.name));

    // Read and execute migrations in order
    const migrations = [
      '001_initial.sql',
      '002_add_oauth.sql',
      '003_wall_of_fame.sql'
    ];

    for (const migration of migrations) {
      if (!executedMigrations.has(migration)) {
        console.log(`Executing migration: ${migration}`);
        const sql = readFileSync(join(__dirname, migration), 'utf8');
        
        // Execute each statement separately
        const statements = sql
          .split(';')
          .map(s => s.trim())
          .filter(s => s.length > 0);

        for (const statement of statements) {
          await client.execute(statement);
        }

        // Record migration
        await client.execute(
          'INSERT INTO migrations (name) VALUES (?)',
          [migration]
        );
        console.log(`Completed migration: ${migration}`);
      }
    }

    console.log('All migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();