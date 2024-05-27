import { Task, TaskProps } from "./../../domain/entities/Task"

export class TaskRepository {
  private tasks: Task[] = []

  create(taskData: TaskProps): Task {
    const task = new Task({ ...taskData})
    return task
  }

  async save(task: Task): Promise<Task> {
    this.tasks.push(task)
    return task
  }
}