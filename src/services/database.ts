import { supabase } from '../lib/supabase/client';
import { logger } from '../utils/logger';

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase.from('users').select('count');
    if (error) throw error;
    return true;
  } catch (error) {
    logger.error('Database connection check failed:', error);
    return false;
  }
}

export async function getDatabaseHealth() {
  const isConnected = await checkDatabaseConnection();
  return {
    status: isConnected ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
  };
}