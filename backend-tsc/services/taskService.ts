import { Task } from '../models/task';
import { redisClient } from '../utils/redisClient';
import { config } from '../config/envConfig';

// Handle new tasks
export const handleNewTask = async (task: string): Promise<void> => {
  try {
    const data = await redisClient.get(config.REDIS_KEY);
    let taskList: string[] = data ? JSON.parse(data) : [];

    taskList.push(task);

    if (taskList.length > 50) {
      const newTask = new Task({ items: taskList });
      await newTask.save();
      await redisClient.set(config.REDIS_KEY, JSON.stringify([]));
    } else {
      await redisClient.set(config.REDIS_KEY, JSON.stringify(taskList));
    }
  } catch (err) {
    console.error('Error handling new task:', err);
    throw err;
  }
};
