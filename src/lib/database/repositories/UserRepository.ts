import { DatabaseClient, Repository } from '../types';
import type { User } from '../../../types/auth';

export class UserRepository implements Repository<User> {
  constructor(private client: DatabaseClient) {}

  async findById(id: string): Promise<User | null> {
    const users = await this.client.query<User>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return users[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.client.query<User>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return users[0] || null;
  }

  async findAll(): Promise<User[]> {
    return this.client.query<User>('SELECT * FROM users');
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const id = crypto.randomUUID();
    await this.client.execute(
      `INSERT INTO users (id, name, email, role, hashedPassword)
       VALUES (?, ?, ?, ?, ?)`,
      [id, data.name, data.email, data.role, data.hashedPassword]
    );
    return this.findById(id) as Promise<User>;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const sets: string[] = [];
    const values: any[] = [];
    
    Object.entries(data).forEach(([key, value]) => {
      sets.push(`${key} = ?`);
      values.push(value);
    });
    
    values.push(id);
    
    await this.client.execute(
      `UPDATE users SET ${sets.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(id) as Promise<User>;
  }

  async delete(id: string): Promise<void> {
    await this.client.execute('DELETE FROM users WHERE id = ?', [id]);
  }
}