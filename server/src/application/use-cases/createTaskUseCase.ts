import { Task, TaskProps } from '../../domain/entities/task'
import { TaskRepository } from './../../infrastructure/persistence/TaskRepository'

export class CreateTaskUseCase {
  private taskRepository: TaskRepository

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository
  }

  async execute(taskData: TaskProps): Promise<Task> {
    const task = await this.taskRepository.create(taskData)
    return task
  }
}