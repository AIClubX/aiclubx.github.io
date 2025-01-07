interface Config {
  apiUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
  supabaseUrl: string;
  supabaseAnonKey: string;
}

const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
};

export default config;