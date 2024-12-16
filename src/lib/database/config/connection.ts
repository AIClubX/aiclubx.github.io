import { Pool, PoolConfig } from 'pg';
import { logger } from '../../../utils/logger';
import { ConnectionConfig } from '../types';

let pool: Pool | null = null;

export async function initializeDatabase(config: ConnectionConfig) {
  if (pool) {
    return pool;
  }

  const poolConfig: PoolConfig = {
    connectionString: config.url,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
    max: config.maxConnections || 20,
    idleTimeoutMillis: config.idleTimeout || 30000
  };

  try {
    pool = new Pool(poolConfig);
    
    // Test connection
    await pool.query('SELECT NOW()');
    logger.info('Database connection established successfully');
    
    return pool;
  } catch (error) {
    logger.error('Failed to initialize database:', error);
    throw error;
  }
}

export function getDatabase() {
  if (!pool) {
    throw new Error('Database not initialized. Call initializeDatabase first.');
  }
  return pool;
}