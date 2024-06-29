import express from 'express';
import { TaskController } from '../../presentation/controllers/TaskController';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

const taskController = new TaskController();

app.post('/tasks', (req, res) => taskController.createTask(req, res));
app.get('/tasks', (req, res) => taskController.getAllTask(req, res));

export { app };