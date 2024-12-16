import { OAuth2Client } from 'google-auth-library';
import type { OAuthUser } from '../../types/auth';

const googleClient = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

export async function validateGoogleToken(token: string): Promise<OAuthUser> {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.VITE_GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid token payload');
    }

    const { email, name, picture, sub: googleId } = payload;

    return {
      email: email!,
      name: name!,
      picture,
      googleId
    };
  } catch (error) {
    console.error('Token validation error:', error);
    throw error;
  }
}