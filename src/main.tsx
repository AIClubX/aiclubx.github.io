import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { authConfig } from './config/auth';
import './index.css';

// Initialize configurations
authConfig.init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={authConfig.googleClientId || ''}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);