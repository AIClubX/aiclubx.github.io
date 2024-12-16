import { DatabaseClient, Repository } from '../types';
import type { Event } from '../../../types';

export class EventRepository implements Repository<Event> {
  constructor(private client: DatabaseClient) {}

  async findById(id: string): Promise<Event | null> {
    const events = await this.client.query<Event>(
      'SELECT * FROM events WHERE id = ?',
      [id]
    );
    return events[0] || null;
  }

  async findAll(): Promise<Event[]> {
    return this.client.query<Event>('SELECT * FROM events');
  }

  async findByChapter(chapterId: string): Promise<Event[]> {
    return this.client.query<Event>(
      'SELECT * FROM events WHERE chapter_id = ?',
      [chapterId]
    );
  }

  async create(data: Omit<Event, 'id'>): Promise<Event> {
    const id = crypto.randomUUID();
    await this.client.execute(
      `INSERT INTO events (id, title, date, location, description, type, chapter_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, data.title, data.date, data.location, data.description, data.type, data.chapterId]
    );
    return this.findById(id) as Promise<Event>;
  }

  async update(id: string, data: Partial<Event>): Promise<Event> {
    const sets: string[] = [];
    const values: any[] = [];
    
    Object.entries(data).forEach(([key, value]) => {
      sets.push(`${key} = ?`);
      values.push(value);
    });
    
    values.push(id);
    
    await this.client.execute(
      `UPDATE events SET ${sets.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(id) as Promise<Event>;
  }

  async delete(id: string): Promise<void> {
    await this.client.execute('DELETE FROM events WHERE id = ?', [id]);
  }
}