import { Pool } from 'pg';
import { DatabaseClient } from './types';
import { logger } from '../../utils/logger';

let pool: Pool | null = null;

export async function initializeDatabase(): Promise<DatabaseClient> {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false
    });
  }

  return {
    async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
      const client = await pool!.connect();
      try {
        const result = await client.query(sql, params);
        return result.rows;
      } finally {
        client.release();
      }
    },

    async execute(sql: string, params: any[] = []): Promise<void> {
      const client = await pool!.connect();
      try {
        await client.query(sql, params);
      } finally {
        client.release();
      }
    },

    async transaction<T>(fn: (client: DatabaseClient) => Promise<T>): Promise<T> {
      const client = await pool!.connect();
      try {
        await client.query('BEGIN');
        const result = await fn(this);
        await client.query('COMMIT');
        return result;
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    }
  };
}