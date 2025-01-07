import Database from 'better-sqlite3';
import { DatabaseClient } from './types';

export class SQLiteClient implements DatabaseClient {
  private db: Database.Database;

  constructor(dbPath: string) {
    this.db = new Database(dbPath);
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const stmt = this.db.prepare(sql);
    return stmt.all(...params) as T[];
  }

  async execute(sql: string, params: any[] = []): Promise<void> {
    const stmt = this.db.prepare(sql);
    stmt.run(...params);
  }

  async transaction<T>(fn: (client: DatabaseClient) => Promise<T>): Promise<T> {
    return this.db.transaction(async () => {
      return await fn(this);
    })();
  }
}