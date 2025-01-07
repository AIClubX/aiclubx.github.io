import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/server';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Forward the request to Express app
  return new Promise((resolve, reject) => {
    app(req, res);
    res.on('finish', resolve);
    res.on('error', reject);
  });
}