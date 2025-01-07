export interface ConnectionConfig {
  url: string;
  authToken?: string;
  maxConnections?: number;
  idleTimeout?: number;
  ssl?: boolean;
  debug?: boolean;
}

export interface DatabaseClient {
  query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  execute(sql: string, params?: any[]): Promise<void>;
  transaction<T>(fn: (client: DatabaseClient) => Promise<T>): Promise<T>;
  close?(): Promise<void>;
}

export interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
}

export interface DatabaseError extends Error {
  code?: string;
  constraint?: string;
  detail?: string;
  table?: string;
  column?: string;
}