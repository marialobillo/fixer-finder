import express from 'express';
import { createTaskController } from '../../presentation/controllers/TaskController';


const app = express();
app.use(express.json());

const taskController = new createTaskController();

app.post('/tasks', (req, res) => taskController.createTask(req, res));

export { app };