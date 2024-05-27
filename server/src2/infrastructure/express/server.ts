import express from 'express';
import { TaskRepository } from '../persistance/taskRepository';
import { CreateTask } from '../../domain/usecases/createTask';
import { createTaskController } from '../../app/controllers/taskController';

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 3000

const taskRepository = new TaskRepository()
const createTaskUseCase = new CreateTask(taskRepository)

app.post('/tasks', (req, res) => createTaskController(req, res, createTaskUseCase))

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})