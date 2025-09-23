import { NextApiRequest, NextApiResponse } from 'next';

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class AppError extends Error implements ApiError {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (error: unknown, req: NextApiRequest, res: NextApiResponse) => {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const message = error instanceof Error ? error.message : 'Internal server error';

  console.error('API Error:', {
    message,
    statusCode,
    stack: error instanceof Error ? error.stack : undefined,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(statusCode).json({
    error: message,
    ...(isDevelopment && error instanceof Error && { stack: error.stack })
  });
};

export const asyncHandler = (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    Promise.resolve(fn(req, res)).catch((error) => {
      errorHandler(error, req, res);
    });
  };
};

export const notFound = (req: NextApiRequest, res: NextApiResponse) => {
  const error = new AppError(`Not found - ${req.url}`, 404);
  errorHandler(error, req, res);
};
