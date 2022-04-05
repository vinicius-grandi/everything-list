import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? './.test.env' : './.env',
});

const redisClient = new Redis({
  host: process.env.NOSQL_DB_HOST,
  port: Number(process.env.NOSQL_DB_PORT),
  password: process.env.NOSQL_DB_PASS,
  tls: {
    rejectUnauthorized: false,
  },
});

redisClient.on('error', (err) => {
  process.nextTick(() => {
    console.error(err);
  });
});

export default redisClient;
