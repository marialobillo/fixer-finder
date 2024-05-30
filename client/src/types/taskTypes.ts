export interface Task {
  title: string
  description: string
  location: string
  price: string
  dueDate: string
  images: (File | string)[]
}