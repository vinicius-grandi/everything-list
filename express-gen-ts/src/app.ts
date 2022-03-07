import express from 'express';
import loginRouter from './routes/login';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import helmet from 'helmet';

// creating express app
const app = express();

const expirationTime = 1000 * 60 * 60 * 24;
const session = sessions({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: expirationTime,
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(session);
app.use(loginRouter);

export default app;
