import Redis, { ValueType } from 'ioredis';
import { promisify } from 'util';

const redisClient = new Redis();

function getRedis(key: string) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(key);
}

function setRedis(key: string, value: ValueType) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(key, value);
}

export { redisClient, setRedis, getRedis };
