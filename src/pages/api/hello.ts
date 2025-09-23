// Enhanced API route with proper backend functionality
import type { NextApiRequest, NextApiResponse } from "next";
import { corsMiddleware, requestLogger } from "../../lib/middleware";

type Data = {
  message: string;
  timestamp: string;
  environment: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // Apply middleware
  corsMiddleware(req, res, () => {
    requestLogger(req, res, () => {
      const data: Data = {
        message: "Welcome to Jungle Light API!",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      };
      
      res.status(200).json(data);
    });
  });
}
