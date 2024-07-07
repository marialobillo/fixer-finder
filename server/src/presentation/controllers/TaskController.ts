import { Request, Response } from 'express'
import { CreateTaskUseCase } from './../../application/use-cases/createTaskUseCase'
import { GetAllTasksUseCase } from '../../application/use-cases/getAllTasksUseCase';
import { PostgreSQLTaskRepository } from '../../infrastructure/database/postgresql/PostgreSQLTaskRepository';
import Joi from 'joi';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

const taskSchema = Joi.object({
  id: Joi.string().optional(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  price: Joi.number().required(),
  dueDate: Joi.date().required(),
  media: Joi.array().items(Joi.string()).required(),
  tags: Joi.array().items(Joi.string()).required()
})

export class TaskController {
  private createTaskUseCase: CreateTaskUseCase
  private getAllTaskUseCase: GetAllTasksUseCase

  constructor() {
    const taskRepository = new PostgreSQLTaskRepository()
    this.createTaskUseCase = new CreateTaskUseCase(taskRepository)
    this.getAllTaskUseCase = new GetAllTasksUseCase(taskRepository)
  }


  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { error } = taskSchema.validate(req.body)
      if(error) {
        res.status(400).json({ message: error.message })
      }
      const taskData = req.body
      const task = await this.createTaskUseCase.execute(taskData)
      res.status(201).json(task)
    } catch (error: unknown) {
      if(isError(error)) {
        res.status(500).json({ message: error.message})
      } else {
        res.status(500).json({ message: 'An unexpected error occurred.'})
      }
    }
  }

  async getAllTask(req: Request, res: Response): Promise<void> {
    try {
      const { tags, search } = req.query
      const tasks = await this.getAllTaskUseCase.execute({ tags: tags as string, search: search as string })
      res.status(200).json(tasks)
    } catch (error: unknown) {
      if(isError(error)) {
        res.status(500).json({ message: error.message })
      } else {
        res.status(500).json({ message: 'An unexpected error occurred.' })
      }
    }
  }
}