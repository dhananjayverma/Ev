import dotenv from 'dotenv';

dotenv.config();

export const config = {
  MQTT_BROKER_URL: process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com',
  REDIS_KEY: `FULLSTACK_TASK_${process.env.FIRST_NAME || 'Dhananjay'}`,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
  REDIS_HOST_NAME: process.env.REDIS_HOST_NAME || '',
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  MONGO_URL: process.env.MONGO_URL || '',
  PORT: process.env.PORT || 5000,
};
