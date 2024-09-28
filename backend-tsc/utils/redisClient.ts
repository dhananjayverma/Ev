import { createClient } from 'redis';
import { config } from '../config/envConfig';

export const redisClient = createClient({
  password: config.REDIS_PASSWORD,
  socket: {
    host: config.REDIS_HOST_NAME,
    port: config.REDIS_PORT,
  },
});

redisClient.on('error', (err: Error) => console.error('Redis Client Error', err));

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('Connected to Redis');
  }
};
