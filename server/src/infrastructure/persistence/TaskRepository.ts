import { Task, TaskProps } from "../../domain/entities/task"
import { Pool } from 'pg'


export class TaskRepository {
  private tasks: Task[] = []

  constructor(private db: Pool) {}

  create(taskData: TaskProps): Task {
    const task = new Task({ ...taskData})
    return task
  }

  async save(task: Task): Promise<Task> {
    this.tasks.push(task)
    return task
  }

  async getAll(): Promise<Task[]> {
    const result = await this.db.query('SELECT * FROM tasks')
    return result.rows.map((task: TaskProps) => new Task(task))
  }
}