import { Request, Response } from 'express'
import { CreateTaskUseCase } from './../../application/use-cases/createTaskUseCase'
import { GetAllTasksUseCase } from '../../application/use-cases/getAllTasksUseCase';
import { PostgreSQLTaskRepository } from '../../infrastructure/database/postgresql/PostgreSQLTaskRepository';
import Joi from 'joi';
import { logger } from '../../logger';

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


  async createTask(req: Request, res: Response): Promise<Response | void>  {
    logger.info(`Received request to create task: ${JSON.stringify(req.body)}`);
    try {
      const { error } = taskSchema.validate(req.body)
      if (error) {
        logger.warn(`Validation failed: ${error.message}`);
        return res.status(400).json({ message: error.message })
      }
      const taskData = req.body
      logger.info(`Calling CreateTaskUseCase with data: ${JSON.stringify(taskData)}`);

      const task = await this.createTaskUseCase.execute(taskData)
      logger.info(`Successfully created task: ${JSON.stringify(task)}`);

      res.status(201).json(task)
    } catch (error: unknown) {
      if (isError(error)) {
        logger.error(`Error while creating task: ${error.message}`, { stack: error.stack });
        return res.status(500).json({ message: error.message})
      } else {
        logger.error('An unexpected error occurred.', { error });
        return res.status(500).json({ message: 'An unexpected error occurred.'})
      }
    }
  }

  async getAllTask(req: Request, res: Response): Promise<void> {
    try {
      const { tags, search } = req.query
      const tasks = await this.getAllTaskUseCase.execute({ tags: tags as string, search: search as string })
      logger.info(`Successfully fetched tasks: ${JSON.stringify(tasks)}`);
      res.status(200).json(tasks)
    } catch (error: unknown) {
      if (isError(error)) {
        logger.error(`Error while fetching tasks: ${error.message}`, { stack: error.stack });
        res.status(500).json({ message: error.message })
      } else {
        logger.error('An unexpected error occurred.', { error });
        res.status(500).json({ message: 'An unexpected error occurred.' })
      }
    }
  }
}