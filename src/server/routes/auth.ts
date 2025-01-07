import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import { validateGoogleToken } from '../services/oauth';
import { generateToken } from '../utils/auth';
import { getRepositories } from '../lib/database/config';
import { logger } from '../utils/logger';

const router = express.Router();
const googleClient = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    
    // Validate Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.VITE_GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid token payload');
    }

    const { email, name, picture, sub: googleId } = payload;
    const repositories = await getRepositories();

    // Check if user exists
    let user = await repositories.users.findByEmail(email!);

    if (!user) {
      // Create new user with Google credentials
      user = await repositories.users.create({
        email: email!,
        name: name!,
        role: 'regular',
        googleId,
        profileImage: picture,
        hashedPassword: '' // No password for OAuth users
      });
    } else if (!user.googleId) {
      // Link Google account to existing user
      user = await repositories.users.update(user.id, {
        googleId,
        profileImage: picture
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({ token, user });
  } catch (error) {
    logger.error('Google auth error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
});

router.post('/google/validate', async (req, res) => {
  try {
    const { credential } = req.body;
    const userData = await validateGoogleToken(credential);
    res.json(userData);
  } catch (error) {
    logger.error('Token validation error:', error);
    res.status(401).json({ message: 'Token validation failed' });
  }
});

export default router;