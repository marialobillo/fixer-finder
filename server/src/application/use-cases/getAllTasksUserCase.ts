import { Task } from '../../domain/entities/task'
import { TaskRepository } from './../../infrastructure/persistence/TaskRepository'

export class GetAllTasksUseCase {

  constructor(private taskRepository: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.getAll()
  }
}