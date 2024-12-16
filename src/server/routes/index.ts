import { Express } from 'express';
import authRoutes from './auth';
import userRoutes from './users';
import chapterRoutes from './chapters';
import eventRoutes from './events';
import resourceRoutes from './resources';
import contributorRoutes from './contributors';

export function setupRoutes(app: Express) {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/chapters', chapterRoutes);
  app.use('/api/events', eventRoutes);
  app.use('/api/resources', resourceRoutes);
  app.use('/api/contributors', contributorRoutes);
}