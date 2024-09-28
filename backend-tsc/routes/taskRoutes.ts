import { Router } from 'express';
import { addTask, fetchAllTasks } from '../controllers/taskController';

const router = Router();

router.post('/addTask', addTask);
router.get('/fetchAllTasks', fetchAllTasks);

export default router;
