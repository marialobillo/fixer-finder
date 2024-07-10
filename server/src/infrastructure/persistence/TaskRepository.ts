import { FetchTasksParams } from "../../application/use-cases/getAllTasksUseCase"
import { Task, TaskProps } from "../../domain/entities/task"


export interface TaskRepository {
  create(taskData: TaskProps): Promise<Task>
  getAll(params: FetchTasksParams): Promise<Task[]> 
}