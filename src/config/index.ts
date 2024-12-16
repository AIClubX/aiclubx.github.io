interface Config {
  apiUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
  deployUrl: string;
}

const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  deployUrl: import.meta.env.VITE_DEPLOY_URL || '',
};

export default config;