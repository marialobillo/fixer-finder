export interface Task {
  id: string
  title: string
  description: string
  location: string
  price: string
  dueDate: string
  images: (string)[]
  tags: string[]
}

export interface FetchTasksParams {
  tags?: string;
  search?: string;
}