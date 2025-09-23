import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/database';
import { hashPassword, generateToken } from '../../../lib/auth';
import { corsMiddleware, requestLogger } from '../../../lib/middleware';
import { errorHandler } from '../../../lib/error-handler';

interface RegisterRequest extends NextApiRequest {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

export default async function handler(
  req: RegisterRequest,
  res: NextApiResponse
) {
  corsMiddleware(req, res, async () => {
    requestLogger(req, res, async () => {
      try {
        if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
        }

        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        if (password.length < 6) {
          return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Check if user already exists
        const existingUser = await db.get(
          'SELECT id FROM users WHERE username = ? OR email = ?',
          [username, email]
        );

        if (existingUser) {
          return res.status(409).json({ error: 'Username or email already exists' });
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);
        const result = await db.run(
          'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
          [username, email, hashedPassword]
        );

        // Generate token
        const user = {
          id: result.lastID,
          username,
          email,
          created_at: new Date().toISOString()
        };

        const token = generateToken(user);

        res.status(201).json({
          message: 'User created successfully',
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            created_at: user.created_at
          },
          token
        });

      } catch (error) {
        errorHandler(error, req, res);
      }
    });
  });
}
