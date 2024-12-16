import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errorHandler, notFoundHandler } from './middleware/errorHandlers';
import { logger } from './utils/logger';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import chapterRoutes from './routes/chapters';
import eventRoutes from './routes/events';
import resourceRoutes from './routes/resources';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/resources', resourceRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

export default app;