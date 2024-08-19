// express-session.d.ts
import 'express-session';
import type { Content } from '../models';

declare module 'express-session' {
  export interface SessionData {
    identify?: string;
    domain?: string;
    language?: string;
    currency?: string;
    favicon?: string;
    manifest?: Content['manifest'];
  }
}
