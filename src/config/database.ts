import { ConnectionConfig } from '../lib/database/types';

export const dbConfig: ConnectionConfig = {
  url: process.env.POSTGRES_URL || 'postgres://localhost:5432/aiclubx',
  maxConnections: 20,
  idleTimeout: 30000,
  ssl: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development'
};