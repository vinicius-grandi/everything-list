import dotenv from 'dotenv';
import Redis from 'ioredis';
import logger from 'jet-logger';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? './.test.env' : './.env',
});

const redisClient = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis({
      host: process.env.NOSQL_DB_HOST,
      port: Number(process.env.NOSQL_DB_PORT),
      password: process.env.NOSQL_DB_PASS,
      timeout: 10000,
      lazyConnect: true,
    });

redisClient.on('error', (err) => {
  process.nextTick(() => {
    logger.err(`redis${err}`);
  });
});

export default redisClient;
