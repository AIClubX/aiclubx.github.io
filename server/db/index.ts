import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'database.sqlite'));

// Initialize database with schema
const schema = fs.readFileSync(join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

export default db;