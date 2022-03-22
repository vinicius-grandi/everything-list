import express from 'express';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
// import helmet from 'helmet';

// importing routes
import loginRouter from './routes/login';
import weaponsRouter from './routes/weapons';

// creating express app
const app = express();

const expirationTime = 1000 * 60 * 2;
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
app.use('/weapons', weaponsRouter);

export default app;
