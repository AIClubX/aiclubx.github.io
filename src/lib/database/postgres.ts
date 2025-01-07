import { Pool, PoolClient } from 'pg';
import { DatabaseClient } from './types';

export class PostgresClient implements DatabaseClient {
  private pool: Pool;

  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString });
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(sql, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async execute(sql: string, params: any[] = []): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query(sql, params);
    } finally {
      client.release();
    }
  }

  async transaction<T>(fn: (client: DatabaseClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
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
}