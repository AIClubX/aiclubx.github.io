import { logger } from '../utils/logger';

export const authConfig = {
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  jwtSecret: import.meta.env.VITE_JWT_SECRET,
  tokenExpiration: '24h',
  
  init() {
    if (!this.googleClientId) {
      logger.warn('Missing GOOGLE_CLIENT_ID environment variable');
    }
    if (!this.jwtSecret) {
      logger.warn('Missing JWT_SECRET environment variable');
    }
  }
};