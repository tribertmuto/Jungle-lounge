import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/database';
import { corsMiddleware, requestLogger, errorHandler, authenticateToken } from '../../../lib/middleware';
import { AuthRequest } from '../../../lib/auth';

export default async function handler(
  req: AuthRequest,
  res: NextApiResponse
) {
  corsMiddleware(req, res, async () => {
    requestLogger(req, res, async () => {
      authenticateToken(req, res, async () => {
        try {
          if (req.method === 'GET') {
            // Get user profile
            const user = await db.get(
              'SELECT id, username, email, created_at FROM users WHERE id = ?',
              [req.user!.id]
            );

            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }

            // Get user's posts count
            const postsCount = await db.get(
              'SELECT COUNT(*) as count FROM posts WHERE author_id = ?',
              [req.user!.id]
            );

            // Get user's comments count
            const commentsCount = await db.get(
              'SELECT COUNT(*) as count FROM comments WHERE author_id = ?',
              [req.user!.id]
            );

            res.status(200).json({
              user: {
                ...user,
                posts_count: postsCount.count,
                comments_count: commentsCount.count
              }
            });

          } else if (req.method === 'PUT') {
            // Update user profile
            const { username, email } = req.body;

            if (!username || !email) {
              return res.status(400).json({ error: 'Username and email are required' });
            }

            // Check if username or email already exists (excluding current user)
            const existingUser = await db.get(
              'SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?',
              [username, email, req.user!.id]
            );

            if (existingUser) {
              return res.status(409).json({ error: 'Username or email already exists' });
            }

            await db.run(
              'UPDATE users SET username = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
              [username, email, req.user!.id]
            );

            const updatedUser = await db.get(
              'SELECT id, username, email, created_at FROM users WHERE id = ?',
              [req.user!.id]
            );

            res.status(200).json({
              message: 'Profile updated successfully',
              user: updatedUser
            });

          } else {
            res.status(405).json({ error: 'Method not allowed' });
          }

        } catch (error) {
          errorHandler(error, req, res);
        }
      });
    });
  });
}
