import '';

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}
