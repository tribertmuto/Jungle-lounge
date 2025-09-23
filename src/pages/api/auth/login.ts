import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/database';
import { comparePassword, generateToken } from '../../../lib/auth';
import { corsMiddleware, requestLogger, errorHandler } from '../../../lib/middleware';

interface LoginRequest extends NextApiRequest {
  body: {
    username: string;
    password: string;
  };
}

export default async function handler(
  req: LoginRequest,
  res: NextApiResponse
) {
  corsMiddleware(req, res, async () => {
    requestLogger(req, res, async () => {
      try {
        if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
        }

        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
          return res.status(400).json({ error: 'Username and password are required' });
        }

        // Find user
        const user = await db.get(
          'SELECT * FROM users WHERE username = ? OR email = ?',
          [username, username]
        );

        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const userData = {
          id: user.id,
          username: user.username,
          email: user.email,
          created_at: user.created_at
        };

        const token = generateToken(userData);

        res.status(200).json({
          message: 'Login successful',
          user: userData,
          token
        });

      } catch (error) {
        errorHandler(error, req, res);
      }
    });
  });
}
