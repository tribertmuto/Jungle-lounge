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
          if (req.method === 'POST') {
            // Create new comment
            const { post_id, content } = req.body;

            if (!post_id || !content) {
              return res.status(400).json({ error: 'Post ID and content are required' });
            }

            // Check if post exists
            const post = await db.get('SELECT id FROM posts WHERE id = ?', [post_id]);
            if (!post) {
              return res.status(404).json({ error: 'Post not found' });
            }

            const result = await db.run(
              'INSERT INTO comments (content, post_id, author_id) VALUES (?, ?, ?)',
              [content, post_id, req.user!.id]
            );

            const newComment = await db.get(`
              SELECT 
                c.id,
                c.content,
                c.created_at,
                u.username as author_name
              FROM comments c
              JOIN users u ON c.author_id = u.id
              WHERE c.id = ?
            `, [result.lastID]);

            res.status(201).json({
              message: 'Comment created successfully',
              comment: newComment
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
