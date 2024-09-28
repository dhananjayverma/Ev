import mongoose from 'mongoose';
import { config } from "../config/envConfig"

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
  }
};
