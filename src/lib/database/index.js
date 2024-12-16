import { createClient } from '@libsql/client';

let dbClient = null;

export function initializeDatabase() {
  if (dbClient) {
    return dbClient;
  }

  try {
    const client = createClient({
      url: 'file:local.db',
    });

    dbClient = {
      async query(sql, params = []) {
        const result = await client.execute(sql, params);
        return result.rows;
      },

      async execute(sql, params = []) {
        await client.execute(sql, params);
      },

      async transaction(fn) {
        return client.transaction(async (tx) => {
          const txClient = {
            query: (sql, params) => tx.execute(sql, params).then(r => r.rows),
            execute: (sql, params) => tx.execute(sql, params).then(() => {}),
            transaction: () => Promise.reject(new Error('Nested transactions not supported')),
          };
          return await fn(txClient);
        });
      }
    };

    console.log('Database initialized successfully');
    return dbClient;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

export function getDatabase() {
  if (!dbClient) {
    throw new Error('Database not initialized');
  }
  return dbClient;
}