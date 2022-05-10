import { resolve } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import fileUpload from 'express-fileupload';
import connectRedis from 'connect-redis';
import helmet from 'helmet';
import redisClient from './redisConfig';
import './app/models';

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
  proxy: true,
  cookie: {
    httpOnly: process.env.NODE_ENV !== 'test',
    maxAge: expirationTime,
    sameSite: process.env.NODE_ENV === 'test' ? 'none' : 'lax',
    secure: process.env.NODE_ENV !== 'test',
  },
});

// handling upload
const fileSize = 50 * 1024 * 1024;

app.use(express.static(resolve('..', 'client', 'build')));

app.set('Feature-Policy', [
  "layout-animations 'none'",
  "unoptimized-images 'none'",
  "oversized-images 'none'",
  "sync-script 'none'",
  "sync-xhr 'none'",
  "unsized-media 'none'",
]);

// helmet configs
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        frameSrc: [
          'youtube.com',
          'www.youtube.com',
          'https://youtube.com',
          'https://www.youtube.com',
        ],
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://*.google.com',
          'https://*.google-analytics.com',
          'https://*.googletagmanager.com',
          'https://*.hotjar.com',
          'https://*.mollie.com',
        ],
        connectSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://*.google.com',
          'https://*.google-analytics.com',
          'https://*.googletagmanager.com',
          'https://*.hotjar.com',
          'https://*.mollie.com',
        ],
        imgSrc: [`'self'`, `data:`, 'https://*'],
      },
    },
  }),
);

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
app.get('*', (_, res) => {
  res.sendFile(resolve('..', 'client', 'build', 'index.html'));
});

export default app;
