import 'express-session';
import { UserAttributes } from '../app/models/User';

declare module 'express-session' {
  export interface SessionData {
    userId: number;
    authenticated: boolean;
    user: Partial<UserAttributes>;
  }
}
