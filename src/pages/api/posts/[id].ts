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
          const { id } = req.query;

          if (!id || Array.isArray(id)) {
            return res.status(400).json({ error: 'Invalid post ID' });
          }

          if (req.method === 'GET') {
            // Get single post with comments
            const post = await db.get(`
              SELECT 
                p.id,
                p.title,
                p.content,
                p.created_at,
                p.updated_at,
                u.username as author_name
              FROM posts p
              JOIN users u ON p.author_id = u.id
              WHERE p.id = ?
            `, [id]);

            if (!post) {
              return res.status(404).json({ error: 'Post not found' });
            }

            // Get comments for this post
            const comments = await db.all(`
              SELECT 
                c.id,
                c.content,
                c.created_at,
                u.username as author_name
              FROM comments c
              JOIN users u ON c.author_id = u.id
              WHERE c.post_id = ?
              ORDER BY c.created_at ASC
            `, [id]);

            res.status(200).json({
              post: {
                ...post,
                comments
              }
            });

          } else if (req.method === 'PUT') {
            // Update post (requires authentication and ownership)
            if (!req.user) {
              return res.status(401).json({ error: 'Authentication required' });
            }

            const { title, content } = req.body;

            if (!title || !content) {
              return res.status(400).json({ error: 'Title and content are required' });
            }

            // Check if post exists and user owns it
            const existingPost = await db.get(
              'SELECT author_id FROM posts WHERE id = ?',
              [id]
            );

            if (!existingPost) {
              return res.status(404).json({ error: 'Post not found' });
            }

            if (existingPost.author_id !== req.user.id) {
              return res.status(403).json({ error: 'Not authorized to update this post' });
            }

            await db.run(
              'UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
              [title, content, id]
            );

            const updatedPost = await db.get(`
              SELECT p.*, u.username as author_name 
              FROM posts p 
              JOIN users u ON p.author_id = u.id 
              WHERE p.id = ?
            `, [id]);

            res.status(200).json({
              message: 'Post updated successfully',
              post: updatedPost
            });

          } else if (req.method === 'DELETE') {
            // Delete post (requires authentication and ownership)
            if (!req.user) {
              return res.status(401).json({ error: 'Authentication required' });
            }

            // Check if post exists and user owns it
            const existingPost = await db.get(
              'SELECT author_id FROM posts WHERE id = ?',
              [id]
            );

            if (!existingPost) {
              return res.status(404).json({ error: 'Post not found' });
            }

            if (existingPost.author_id !== req.user.id) {
              return res.status(403).json({ error: 'Not authorized to delete this post' });
            }

            // Delete comments first (foreign key constraint)
            await db.run('DELETE FROM comments WHERE post_id = ?', [id]);
            
            // Delete post
            await db.run('DELETE FROM posts WHERE id = ?', [id]);

            res.status(200).json({
              message: 'Post deleted successfully'
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
