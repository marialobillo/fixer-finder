import { Task, TaskProps } from "../../domain/entities/task"



export interface TaskRepository {

  create(taskData: TaskProps): Promise<Task>
  getAll(): Promise<Task[]> 
}