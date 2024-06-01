import axios, { isAxiosError} from 'axios'
import { Task } from '../types/taskTypes'

const baseUrl = 'http://localhost:3000'

const client = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createTask = async (task: Task): Promise<Task> => {
  try {
    const response = await client.post<Task>('/tasks', task)
    return response.data
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.status)
      console.error(error.response)
      throw new Error(error.response?.data.message || 'Failed to create task');
    } else {
      throw new Error('Unexpected error occurred')
    }
  }
}