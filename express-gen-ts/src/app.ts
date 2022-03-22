import express from 'express';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import connectRedis from 'connect-redis';
import redisClient from './redisConfig';
// import helmet from 'helmet';

// importing routes
import loginRouter from './routes/login';
import weaponsRouter from './routes/weapons';

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
    httpOnly: true,
    maxAge: expirationTime,
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(session);
app.use(loginRouter);
app.use('/weapons', weaponsRouter);

export default app;
