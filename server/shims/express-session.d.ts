// express-session.d.ts
import 'express-session';

declare module 'express-session' {
  export interface SessionData {
    domain?: string;
    language?: string;
    currency?: string;
  }
}
