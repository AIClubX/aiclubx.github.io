import { DatabaseClient, Repository } from '../types';
import type { Contributor } from '../../../types';

export class ContributorRepository implements Repository<Contributor> {
  constructor(private client: DatabaseClient) {}

  async findById(id: string): Promise<Contributor | null> {
    const contributors = await this.client.query<any>(
      'SELECT * FROM contributors WHERE id = ?',
      [id]
    );
    
    if (!contributors.length) return null;
    return this.mapContributor(contributors[0]);
  }

  async findAll(): Promise<Contributor[]> {
    const contributors = await this.client.query<any>(
      'SELECT * FROM contributors ORDER BY start_date DESC'
    );
    return contributors.map(this.mapContributor);
  }

  async findFeatured(): Promise<Contributor[]> {
    const contributors = await this.client.query<any>(
      'SELECT * FROM contributors WHERE featured = 1 ORDER BY start_date DESC LIMIT 3'
    );
    return contributors.map(this.mapContributor);
  }

  async create(data: Omit<Contributor, 'id'>): Promise<Contributor> {
    const id = crypto.randomUUID();
    await this.client.execute(
      `INSERT INTO contributors (id, name, title, bio, image, featured, start_date, end_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        data.name,
        data.title,
        data.bio,
        data.image,
        data.featured ? 1 : 0,
        data.startDate,
        data.endDate || null
      ]
    );
    const created = await this.findById(id);
    if (!created) throw new Error('Failed to create contributor');
    return created;
  }

  async update(id: string, data: Partial<Contributor>): Promise<Contributor> {
    const current = await this.findById(id);
    if (!current) throw new Error('Contributor not found');

    const updates = {
      name: data.name ?? current.name,
      title: data.title ?? current.title,
      bio: data.bio ?? current.bio,
      image: data.image ?? current.image,
      featured: data.featured ?? current.featured,
      start_date: data.startDate ?? current.startDate,
      end_date: data.endDate ?? current.endDate
    };

    await this.client.execute(
      `UPDATE contributors 
       SET name = ?, title = ?, bio = ?, image = ?, featured = ?, start_date = ?, end_date = ?
       WHERE id = ?`,
      [
        updates.name,
        updates.title,
        updates.bio,
        updates.image,
        updates.featured ? 1 : 0,
        updates.start_date,
        updates.end_date,
        id
      ]
    );

    const updated = await this.findById(id);
    if (!updated) throw new Error('Failed to update contributor');
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.client.execute('DELETE FROM contributors WHERE id = ?', [id]);
  }

  private mapContributor(row: any): Contributor {
    return {
      id: row.id,
      name: row.name,
      title: row.title,
      bio: row.bio,
      image: row.image,
      featured: Boolean(row.featured),
      startDate: row.start_date,
      endDate: row.end_date || null
    };
  }
}