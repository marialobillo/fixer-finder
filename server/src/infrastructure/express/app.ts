import express from 'express';


const app = express();
app.use(express.json());

const taskController = new TaskController();

app.post('/tasks', (req, res) => taskController.createTask(req, res));

export { app };