import express from 'express';
import cors from 'cors';
import { connectDB } from './utils/db';
import { connectRedis } from './utils/redisClient';
import taskRoutes from './routes/taskRoutes';
import { config } from './config/envConfig';

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB and Redis
connectDB();
connectRedis();

app.use(taskRoutes);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
