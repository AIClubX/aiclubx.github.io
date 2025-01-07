import { ConnectionConfig } from '../types';
import { join } from 'path';

export function getDatabaseConfig(): ConnectionConfig {
  const isDev = process.env.NODE_ENV === 'development';
  const dbPath = join(process.cwd(), 'data', 'local.db');

  return {
    url: process.env.DATABASE_URL || `file:${dbPath}`,
    authToken: process.env.DATABASE_AUTH_TOKEN,
    maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS || '10'),
    idleTimeout: parseInt(process.env.DATABASE_IDLE_TIMEOUT || '30000'),
    ssl: process.env.DATABASE_SSL === 'true',
    debug: isDev,
  };
}