import { FetchTasksParams } from "../../../application/use-cases/getAllTasksUseCase";
import { Task, TaskProps } from "../../../domain/entities/task";
import { logger } from "../../../logger";
import { TaskRepository } from "../../persistence/TaskRepository";
import { PostgreSQLClient } from "./PostgreSQLClient";


export class PostgreSQLTaskRepository implements TaskRepository {
  private client: PostgreSQLClient

  constructor() {
    this.client = PostgreSQLClient.getInstance()
  }

  async getAll(params: FetchTasksParams): Promise<Task[]> {
    const { tags, search } = params
    let query = 'SELECT * FROM tasks'
    const conditions: string[] = []
    const values: any[] = []
    if (tags && tags.length > 0) {
      conditions.push(`tags @> $${conditions.length + 1}`)
      values.push(JSON.stringify(tags))
    }
    if(search) {
      conditions.push(`title ILIKE $${conditions.length + 1} OR description ILIKE $${conditions.length + 1} OR location ILIKE $${conditions.length + 1}`)
      values.push(`%${search}%`)
    }
    if(conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`
    }
    const result = await this.client.query(query, values)
    return result.rows.map((task: any) => new Task(task))
  }

  async create(taskProps: TaskProps): Promise<Task> {
    const task = new Task(taskProps)
    const result = await this.client.query(
      'INSERT INTO tasks (id, title, description, location, price, dueDate, media, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        task.id,
        task.title,
        task.description,
        task.location,
        task.price,
        task.dueDate,
        JSON.stringify(task.media),
        JSON.stringify(task.tags)
      ]
    );
    if (!result || !result.rows || result.rows.length === 0) {
      logger.error('Failed to create task, no data returned')
      throw new Error('Failed to create task, no data returned')
    }
    const dbTask = result.rows[0];
    const taskRow = {
      id: dbTask.id,
      title: dbTask.title,
      description: dbTask.description,
      location: dbTask.location,
      price: dbTask.price,
      dueDate: dbTask.duedate,
      media: dbTask.media,
      tags: dbTask.tags,
    };
    return new Task(taskRow)
  }
}
