// express.d.ts
import 'express';

declare module 'express' {
  export interface Request {
    language?: string;
    timezone?: string;
    currency?: string;
    client?: {
      phone?: string;
      email?: string;
    };
  }
}
