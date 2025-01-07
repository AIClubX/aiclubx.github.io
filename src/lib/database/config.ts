import { supabase } from '../supabase/client';
import { logger } from '../../utils/logger';
import config from '../../config';

export async function setupDatabase() {
  if (!config.supabaseUrl || !config.supabaseAnonKey) {
    throw new Error('Missing Supabase configuration. Please check your environment variables.');
  }

  try {
    const { data, error } = await supabase.from('users').select('count');
    if (error) throw error;
    
    logger.info('Database connection established successfully');
    return supabase;
  } catch (error) {
    logger.error('Failed to setup database:', error);
    throw error;
  }
}

// Singleton instance
let databaseInstance = supabase;

export function getDatabase() {
  if (!databaseInstance) {
    throw new Error('Database not initialized. Call setupDatabase first.');
  }
  return databaseInstance;
}