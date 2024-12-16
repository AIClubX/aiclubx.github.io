import { TursoClient } from './client';
import { createRepositories } from './repositories';
import { runMigrations } from './migrations';
import { logger } from '../../utils/logger';

export async function setupDatabase() {
  try {
    const url = process.env.DATABASE_URL || 'file:local.db';
    const authToken = process.env.DATABASE_AUTH_TOKEN;
    
    const client = new TursoClient(url, authToken);
    
    // Run migrations
    await runMigrations(client);
    
    const repositories = createRepositories(client);
    
    logger.info('Database connection established successfully');
    
    return repositories;
  } catch (error) {
    logger.error('Failed to setup database:', error);
    throw error;
  }
}

// Singleton instance
let repositoriesInstance: ReturnType<typeof createRepositories>;

export async function getRepositories() {
  if (!repositoriesInstance) {
    repositoriesInstance = await setupDatabase();
  }
  return repositoriesInstance;
}