export interface Task {
  id: string
  title: string
  description: string
  location: string
  price: string
  dueDate: string
  images: (File | string)[]
  tags: string[]
}