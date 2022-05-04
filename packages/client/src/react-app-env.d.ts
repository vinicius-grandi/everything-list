/// <reference types="react-scripts" />

declare module 'react/jsx-runtime' {
  export default any;
}

declare module 'express-session' {
  export interface SessionData {
    userId: any;
    authenticated: any;
    user: any;
  }
}
