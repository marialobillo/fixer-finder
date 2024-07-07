import axios, { isAxiosError } from 'axios'
import { Task, FetchTasksParams } from '../types/taskTypes'

const baseUrl = 'http://localhost:4000'

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
    if (isAxiosError(error)) {
      console.log(error.status)
      console.error(error.response)
      throw new Error(error.response?.data.message || 'Failed to create task')
    } else {
      throw new Error('Unexpected error occurred')
    }
  }
}

export const getAllTasks = async () => {
  try {
    const response = await client.get<Task[]>('/tasks')
    if (!response.data) {
      throw new Error('Failed to fetch tasks')
    }
    return response.data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}


export const getTasksByCriteria = async (params: FetchTasksParams): Promise<Task[]> => {
  try {
    console.log('Params:', params)
    const { tags, search } = params;
    console.log('tags FEFEFE:', tags)
    console.log('search FEFEFE:', search)
    const response = await client.get<Task[]>('/tasks', {
      params: {
        tags: tags ? tags.split(',').map(tag => tag.trim()) : undefined,
        search: search || undefined,
      }
    });

    console.log('Response from getTasksByCriteria:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
