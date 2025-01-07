import { supabase } from '../lib/supabase/client';
import { logger } from './logger';

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count');

    if (error) {
      logger.error('Supabase connection test failed:', error.message);
      return false;
    }

    logger.info('Supabase connection test successful');
    return true;
  } catch (error) {
    logger.error('Supabase connection test failed:', error);
    return false;
  }
}