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
    console.log('on the use case:', params)
    return await this.taskRepository.getAll(params)
  }
}