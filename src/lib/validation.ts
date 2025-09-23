import { NextApiRequest } from 'next';

export interface ValidationErrorData {
  field: string;
  message: string;
}

export class ValidationError extends Error {
  public errors: ValidationErrorData[];

  constructor(errors: ValidationErrorData[]) {
    super('Validation failed');
    this.errors = errors;
    this.name = 'ValidationError';
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUsername = (username: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }
  
  if (username.length > 20) {
    errors.push('Username must be less than 20 characters long');
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateRequired = (data: Record<string, unknown>, fields: string[]): ValidationErrorData[] => {
  const errors: ValidationErrorData[] = [];
  
  fields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors.push({
        field,
        message: `${field} is required`
      });
    }
  });
  
  return errors;
};

export const validateRequestBody = (req: NextApiRequest, requiredFields: string[]): Record<string, unknown> => {
  const body = req.body;
  
  if (!body || typeof body !== 'object') {
    throw new ValidationError([{
      field: 'body',
      message: 'Request body is required'
    }]);
  }
  
  const errors = validateRequired(body, requiredFields);
  
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  
  return body;
};
