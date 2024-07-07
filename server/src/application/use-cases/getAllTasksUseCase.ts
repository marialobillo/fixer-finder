import { Task } from '../../domain/entities/task'
import { TaskRepository } from './../../infrastructure/persistence/TaskRepository'

export interface FetchTasksParams {
  tags?: string
  search?: string
}

export class GetAllTasksUseCase {
  private taskRepository: TaskRepository

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository
  }

  async execute(params: FetchTasksParams): Promise<Task[]> {
    return await this.taskRepository.getAll(params)
  }
}