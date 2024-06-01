import { Request, Response } from 'express'
import { CreateTaskUseCase } from './../../application/use-cases/createTaskUseCase'
import { TaskRepository } from '../../infrastructure/persistence/TaskRepository';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export class createTaskController {
  private createTaskUseCase: CreateTaskUseCase

  constructor() {
    const taskRepository = new TaskRepository()
    this.createTaskUseCase = new CreateTaskUseCase(taskRepository)
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
}