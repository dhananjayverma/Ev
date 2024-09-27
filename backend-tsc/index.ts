import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as mqtt from 'mqtt';
import * as redis from 'redis';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com';
const REDIS_KEY = `FULLSTACK_TASK_${process.env.FIRST_NAME || 'Dhananjay'}`;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';
const REDIS_HOST_NAME = process.env.REDIS_HOST_NAME || '';
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const mongoUrl = process.env.MONGO_URL || '';

// Initialize Express
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection and Schema

mongoose.connect(mongoUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));



// Define Task schema and model
interface ITask {
    items: string[];
}

const taskSchema = new mongoose.Schema<ITask>({
    items: [String]
});
const Task = mongoose.model<ITask>('Task', taskSchema);

// Redis client setup
const redisClient = redis.createClient({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST_NAME,
        port: REDIS_PORT
    }
});

redisClient.on('error', (err: Error) => {
    console.error('Redis Client Error:', err);
});

async function connectRedis() {
    if (!redisClient.isOpen) {
        try {
            await redisClient.connect();
            console.log('Connected to Redis');
        } catch (err) {
            console.error('Redis connection error:', err);
        }
    }
}

// MQTT setup
const mqttClient = mqtt.connect(MQTT_BROKER_URL);

// MQTT subscription
mqttClient.on('connect', () => {
    mqttClient.subscribe('/add', (err: Error | null) => {
        if (!err) {
            console.log('Subscribed to /add topic');
        } else {
            console.error('Error subscribing to /add topic:', err);
        }
    });
});

// Handle MQTT messages
mqttClient.on('message', async (topic: string, message: Buffer) => {
    if (topic === '/add') {
        const task = message.toString();
        console.log(`Received task: ${task}`);
        await handleNewTask(task);
    }
});

// Function to handle new tasks
const handleNewTask = async (task: string): Promise<void> => {
    try {
        await connectRedis();

        const data = await redisClient.get(REDIS_KEY);
        let taskList: string[] = data ? JSON.parse(data) : [];

        // Add the new task to the task list
        taskList.push(task);

        if (taskList.length > 50) {
            // Move tasks to MongoDB
            const newTask = new Task({ items: taskList });
            await newTask.save();
            console.log('Moved tasks to MongoDB and flushed Redis cache');

            // Flush the Redis cache
            await redisClient.set(REDIS_KEY, JSON.stringify([]));
        } else {
            // Update Redis cache with new task list
            await redisClient.set(REDIS_KEY, JSON.stringify(taskList));
            console.log('Updated Redis with new task list');
        }
    } catch (err) {
        console.error('Error handling new task:', err);
    }
};

// HTTP endpoint to add a new task

app.post('/addTask', async (req: Request, res: Response): Promise<Response> => {
    const { task } = req.body;

    if (!task || typeof task !== 'string') {
        return res.status(400).json({ message: 'Invalid task input' });
    }

    try {
        await handleNewTask(task);
        return res.status(200).json({ message: 'Task added successfully' });
    } catch (err) {
        console.error('Error adding task:', err);
        return res.status(500).json({ message: 'Error adding task' });
    }
});

// HTTP API to fetch all tasks from Redis (or MongoDB if Redis is empty)
app.get('/fetchAllTasks', async (req: Request, res: Response) => {
    try {
        await connectRedis();

        const data = await redisClient.get(REDIS_KEY);
        if (data) {
            const taskList: string[] = JSON.parse(data);
            if (taskList.length > 0) {
                return res.json({ tasks: taskList });
            }
        }

        // If Redis is empty, fetch from MongoDB
        const allTasks = await Task.find({});
        if (allTasks.length > 0) {
            const tasksFromDb = allTasks.reduce((acc: string[], taskDoc) => acc.concat(taskDoc.items), []);
            return res.json({ tasks: tasksFromDb });
        }

        return res.status(404).json({ message: 'No tasks found' });
    } catch (err) {
        console.error('Error fetching tasks:', err);
        return res.status(500).json({ message: 'Error retrieving tasks' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
