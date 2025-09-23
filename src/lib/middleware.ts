import { NextApiRequest, NextApiResponse } from 'next';
// Note: express-rate-limit is not compatible with Next.js API routes
// We'll implement a simple rate limiting solution instead

// Simple rate limiting implementation for Next.js API routes
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const createRateLimit = (windowMs: number, max: number) => {
  return (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean up old entries
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
    
    const current = rateLimitMap.get(ip as string);
    
    if (!current) {
      rateLimitMap.set(ip as string, { count: 1, resetTime: now + windowMs });
      next();
    } else if (current.count < max) {
      current.count++;
      next();
    } else {
      res.status(429).json({ error: 'Too many requests from this IP, please try again later.' });
    }
  };
};

// CORS middleware
export function corsMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
}

// Error handling middleware
export function errorHandler(error: any, req: NextApiRequest, res: NextApiResponse) {
  console.error('API Error:', error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: 'Validation failed', details: error.message });
  }
  
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  return res.status(500).json({ error: 'Internal server error' });
}

// Request logging middleware
export function requestLogger(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - ${req.headers['user-agent']}`);
  next();
}
