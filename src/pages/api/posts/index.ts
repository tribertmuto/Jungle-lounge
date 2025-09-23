import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/database';
import { corsMiddleware, requestLogger, errorHandler, optionalAuth } from '../../../lib/middleware';
import { AuthRequest } from '../../../lib/auth';

export default async function handler(
  req: AuthRequest,
  res: NextApiResponse
) {
  corsMiddleware(req, res, async () => {
    requestLogger(req, res, async () => {
      optionalAuth(req, res, async () => {
        try {
          if (req.method === 'GET') {
            // Get all posts with author information
            const posts = await db.all(`
              SELECT 
                p.id,
                p.title,
                p.content,
                p.created_at,
                p.updated_at,
                u.username as author_name
              FROM posts p
              JOIN users u ON p.author_id = u.id
              ORDER BY p.created_at DESC
            `);

            res.status(200).json({
              posts,
              count: posts.length
            });

          } else if (req.method === 'POST') {
            // Create new post (requires authentication)
            if (!req.user) {
              return res.status(401).json({ error: 'Authentication required' });
            }

            const { title, content } = req.body;

            if (!title || !content) {
              return res.status(400).json({ error: 'Title and content are required' });
            }

            const result = await db.run(
              'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
              [title, content, req.user.id]
            );

            const newPost = await db.get(
              'SELECT p.*, u.username as author_name FROM posts p JOIN users u ON p.author_id = u.id WHERE p.id = ?',
              [result.lastID]
            );

            res.status(201).json({
              message: 'Post created successfully',
              post: newPost
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
