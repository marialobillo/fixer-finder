import { Request, Response } from 'express'
import { CreateTaskUseCase } from './../../application/use-cases/createTaskUseCase'

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export const createTaskController = async (req: Request, res: Response, createTaskUseCase: CreateTaskUseCase) => {
  try {
    const taskData = req.body
    const task = await createTaskUseCase.execute(taskData)
    res.status(201).json(task)
  } catch (error: unknown) {
    if(isError(error)) {
      res.status(500).json({ message: error.message})
    } else {
      res.status(500).json({ message: 'An unexpected error occurred.'})
    }
  }
}