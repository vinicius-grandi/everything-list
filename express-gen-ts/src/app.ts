// import { resolve } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import connectRedis from 'connect-redis';
import redisClient from './redisConfig';
// import helmet from 'helmet';

// importing routes and setting routes
import authRouter from './routes/auth';
import userRouter from './routes/user';
import searchRouter from './routes/search';
import noApiListRouter from './routes/noapilist';
import apiListRouter from './routes/apilist';

const noApiListRoutes = ['/weapons'];
const apiListRoutes = ['/animes'];

// creating express app
const app = express();

// app.set('trust proxy', 1);

// creating sessions
const RedisStore = connectRedis(sessions);
const expirationTime = 1000 * 60 * 30;
const session = sessions({
  secret: process.env.SESSION_SECRET ?? '',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    // httpOnly: true,
    maxAge: expirationTime,
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(session);
app.use(authRouter);
app.use('/profiles', userRouter);
app.use(searchRouter);
app.use(noApiListRoutes, noApiListRouter);
app.use(apiListRoutes, apiListRouter);
// app.use('/', express.static(resolve('..', 'myapp', 'build')));

export default app;
