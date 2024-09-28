import { Request, Response } from 'express';
import { handleNewTask } from '../services/taskService';
import { redisClient } from '../utils/redisClient'; 
import { Task, ITask } from '../models/task';
import { config } from '../config/envConfig';

// Add new task
export const addTask = async (req: Request, res: Response): Promise<Response> => {
  const { task } = req.body;
  if (!task || typeof task !== 'string') {
    return res.status(400).json({ message: 'Invalid task input' });
  }

  try {
    await handleNewTask(task);
    return res.status(200).json({ message: 'Task added successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error adding task' });
  }
};

// Fetch tasks
export const fetchAllTasks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await redisClient.get(config. REDIS_KEY);
    if (data) {
      const taskList: string[] = JSON.parse(data);
      return res.json({ tasks: taskList });
    }

    const allTasks = await Task.find({});
    const tasksFromDb = allTasks.reduce((acc: string[], taskDoc: ITask) => acc.concat(taskDoc.items), []);
    return res.json({ tasks: tasksFromDb });
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving tasks' });
  }
};
