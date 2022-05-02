// import { resolve } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import fileUpload from 'express-fileupload';
import connectRedis from 'connect-redis';
import redisClient from './redisConfig';
import './app/models';
// import helmet from 'helmet';

// importing routes and setting routes
import authRouter from './routes/auth';
import userRouter from './routes/user';
import searchRouter from './routes/search';
import noApiListRouter from './routes/noapilist';
import apiListRouter from './routes/apilist';

const noApiListRoutes = ['/weapons'];
const apiListRoutes = ['/animes', '/books', '/movies', '/mangas'];

// creating express app
const app = express();

// app.set('trust proxy', 1);

// creating sessions
const RedisStore = connectRedis(sessions);
const expirationTime =
  process.env.NODE_ENV === 'test' ? 1000 * 60 * 1000 : 1000 * 60 * 30;
const session = sessions({
  secret: process.env.SESSION_SECRET ?? '',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    httpOnly: process.env.NODE_ENV !== 'test',
    maxAge: expirationTime,
  },
});

// handling upload
const fileSize = 50 * 1024 * 1024;

app.use(express.json());
app.use(cookieParser());
app.use(session);
app.use(
  fileUpload({
    limits: {
      fileSize,
    },
  }),
);
app.use(searchRouter);
app.use(noApiListRoutes, noApiListRouter);
app.use(apiListRoutes, apiListRouter);
app.use('/profiles', userRouter);
app.use('/api', authRouter);
// app.use('/', express.static(resolve('..', 'myapp', 'build')));

export default app;
