import { Request, Response } from 'express'
import { CreateTaskUseCase } from './../../application/use-cases/createTaskUseCase'
import { TaskRepository } from '../../infrastructure/persistence/TaskRepository';
import { GetAllTasksUseCase } from '../../application/use-cases/getAllTasksUserCase';
import { PostgreSQLTaskRepository } from '../../infrastructure/database/postgresql/PostgreSQLTaskRepository';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

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
      const tasks = await this.getAllTaskUseCase.execute()
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