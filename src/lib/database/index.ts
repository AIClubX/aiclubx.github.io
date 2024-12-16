import { TursoClient } from './client';
import { runMigrations } from './migrations';
import { logger } from '../../utils/logger';

let dbClient: TursoClient | null = null;

export async function initializeDatabase() {
  if (dbClient) {
    return dbClient;
  }

  try {
    dbClient = new TursoClient('local.db');
    await runMigrations(dbClient);
    logger.info('Database initialized successfully');
    return dbClient;
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    throw error;
  }
}

export function getDatabase() {
  if (!dbClient) {
    throw new Error('Database not initialized. Call initializeDatabase first.');
  }
  return dbClient;
}