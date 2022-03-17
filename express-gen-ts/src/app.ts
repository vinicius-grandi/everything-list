import express from 'express';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
// import helmet from 'helmet';
import loginRouter from './routes/login';

// creating express app
const app = express();

const expirationTime = 1000 * 60 * 60 * 24;
const session = sessions({
  secret: process.env.SESSION_SECRET ?? '',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: expirationTime,
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(session);
app.use(loginRouter);

export default app;
