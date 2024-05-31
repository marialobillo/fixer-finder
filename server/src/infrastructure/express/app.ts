import express from 'express';
import { createTaskController } from '../../presentation/controllers/TaskController';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

const taskController = new createTaskController();

app.post('/tasks', (req, res) => taskController.createTask(req, res));

export { app };