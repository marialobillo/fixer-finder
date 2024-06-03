import { Task, TaskProps } from "../../domain/entities/task"
import { Pool } from 'pg'


export class TaskRepository {
  private tasks: Task[] = []

  constructor() {}

  create(taskData: TaskProps): Task {
    const task = new Task({ ...taskData})
    return task
  }

  async save(task: Task): Promise<Task> {
    this.tasks.push(task)
    return task
  }

  async getAll(): Promise<Task[]> {
    return this.tasks
  }
}