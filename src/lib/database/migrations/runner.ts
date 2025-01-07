import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { DatabaseClient } from '../types';
import { logger } from '../../../utils/logger';

interface Migration {
  id: number;
  name: string;
  executed_at: string;
}

export async function runMigrations(client: DatabaseClient, migrationsPath: string): Promise<void> {
  try {
    // Get migration files
    const files = readdirSync(migrationsPath)
      .filter(f => f.endsWith('.sql'))
      .sort();

    // Execute migrations
    for (const file of files) {
      logger.info(`Running migration: ${file}`);
      const sql = readFileSync(join(migrationsPath, file), 'utf8');

      await client.transaction(async (tx) => {
        // Split and execute multiple statements
        const statements = sql
          .split(';')
          .map(s => s.trim())
          .filter(s => s.length > 0);

        for (const statement of statements) {
          await tx.execute(statement);
        }
      });

      logger.info(`Completed migration: ${file}`);
    }

    logger.info('All migrations completed successfully');
  } catch (error) {
    logger.error('Migration failed:', error);
    throw error;
  }
}