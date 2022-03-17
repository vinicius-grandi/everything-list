import dotenv from 'dotenv';
import Redis, { ValueType } from 'ioredis';
import { promisify } from 'util';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? './.test.env' : './.env',
});

const redisClient = new Redis({
  password: process.env.NOSQL_DB_PASS,
  host: process.env.NOSQL_DB_HOST,
  port: Number(process.env.NOSQL_DB_PORT),
});

function getRedis(key: string) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(key);
}

function setRedis(key: string, value: ValueType) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(key, value);
}

export { redisClient, setRedis, getRedis };
