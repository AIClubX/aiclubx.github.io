import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandlers';
import { initializeDatabase } from '../lib/database/config/connection';
import { dbConfig } from '../config/database';
import { setupRoutes } from './routes';
import { logger } from '../utils/logger';

const app = express();
const port = process.env.PORT || 5000;

// Initialize database
initializeDatabase(dbConfig).catch(error => {
  logger.error('Failed to initialize database:', error);
  process.exit(1);
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.VITE_DEPLOY_URL!]
    : true
}));

// Body parsing
app.use(express.json());

// Health check endpoint
app.get('/api/health', (_, res) => res.status(200).send('OK'));

// Setup routes
setupRoutes(app);

// Error handling
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
}

export default app;