import { DatabaseClient, Repository } from '../types';
import type { Chapter } from '../../../types';

export class ChapterRepository implements Repository<Chapter> {
  constructor(private client: DatabaseClient) {}

  async findById(id: string): Promise<Chapter | null> {
    const chapters = await this.client.query<Chapter>(
      'SELECT * FROM chapters WHERE id = ?',
      [id]
    );
    return chapters[0] || null;
  }

  async findAll(): Promise<Chapter[]> {
    return this.client.query<Chapter>('SELECT * FROM chapters');
  }

  async create(data: Omit<Chapter, 'id'>): Promise<Chapter> {
    const id = crypto.randomUUID();
    await this.client.execute(
      `INSERT INTO chapters (id, name, university, location, member_count, lead_email)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, data.name, data.university, data.location, data.memberCount, data.leadEmail]
    );
    return this.findById(id) as Promise<Chapter>;
  }

  async update(id: string, data: Partial<Chapter>): Promise<Chapter> {
    const sets: string[] = [];
    const values: any[] = [];
    
    Object.entries(data).forEach(([key, value]) => {
      sets.push(`${key} = ?`);
      values.push(value);
    });
    
    values.push(id);
    
    await this.client.execute(
      `UPDATE chapters SET ${sets.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(id) as Promise<Chapter>;
  }

  async delete(id: string): Promise<void> {
    await this.client.execute('DELETE FROM chapters WHERE id = ?', [id]);
  }
}