import { DatabaseClient, Repository } from '../types';
import type { Resource } from '../../../types';

export class ResourceRepository implements Repository<Resource> {
  constructor(private client: DatabaseClient) {}

  async findById(id: string): Promise<Resource | null> {
    const resources = await this.client.query<Resource>(
      'SELECT * FROM resources WHERE id = ?',
      [id]
    );
    return resources[0] || null;
  }

  async findAll(): Promise<Resource[]> {
    return this.client.query<Resource>('SELECT * FROM resources');
  }

  async findByType(type: string): Promise<Resource[]> {
    return this.client.query<Resource>(
      'SELECT * FROM resources WHERE type = ?',
      [type]
    );
  }

  async create(data: Omit<Resource, 'id'>): Promise<Resource> {
    const id = crypto.randomUUID();
    await this.client.execute(
      `INSERT INTO resources (id, title, description, type, link, company, deadline)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, data.title, data.description, data.type, data.link, data.company, data.deadline]
    );
    return this.findById(id) as Promise<Resource>;
  }

  async update(id: string, data: Partial<Resource>): Promise<Resource> {
    const sets: string[] = [];
    const values: any[] = [];
    
    Object.entries(data).forEach(([key, value]) => {
      sets.push(`${key} = ?`);
      values.push(value);
    });
    
    values.push(id);
    
    await this.client.execute(
      `UPDATE resources SET ${sets.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(id) as Promise<Resource>;
  }

  async delete(id: string): Promise<void> {
    await this.client.execute('DELETE FROM resources WHERE id = ?', [id]);
  }
}