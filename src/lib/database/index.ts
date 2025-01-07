import { supabase } from '../supabase/client';
import { logger } from '../../utils/logger';

export async function initializeDatabase() {
  try {
    const { data, error } = await supabase.from('users').select('count');
    if (error) throw error;
    
    logger.info('Database connection established successfully');
    return true;
  } catch (error) {
    logger.error('Failed to initialize database connection:', error);
    throw error;
  }
}

export function getDatabase() {
  return supabase;
}