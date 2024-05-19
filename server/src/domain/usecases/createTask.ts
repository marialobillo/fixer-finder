import { Task, TaskProps } from '../entities/task'
import { TaskRepository } from '../../infrastructure/persistence/taskRepository'

export class CreatTask {
  private taskRepository: TaskRepository

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository
  }

  async execute(taskData: TaskProps): Promise<Task> {
    const task = this.taskRepository.create(taskData)
    return await this.taskRepository.save(task)
  }
}