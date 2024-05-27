import { Task, TaskProps } from "../../../src/domain/entities/task"

describe('Task Entity', () => {
  it('should create a new task with correct properties', () => {
    const taskData: TaskProps = {
      title: 'Task title',
      description: 'Task description',
      location: 'Task location',
      price: 100,
      dueDate: new Date(),
      media: ['image1.jpg', 'image2.jpg'],
      tags: ['tag1', 'tag2']
    }
    const task = new Task(taskData)
    expect(task).toBeInstanceOf(Task)
    expect(task.title).toBe(taskData.title)
    expect(task.description).toBe(taskData.description)
    expect(task.location).toBe(taskData.location)
    expect(task.price).toBe(taskData.price)
    expect(task.dueDate).toBe(taskData.dueDate)
    expect(task.media).toBe(taskData.media)
    expect(task.tags).toBe(taskData.tags)
  })

  it('should create a new task with a random id', () => {
    const taskData = {
      title: 'Task title',
      description: 'Task description',
      location: 'Task location',
      price: 100,
      dueDate: new Date(),
      media: ['image1', 'image2'],
      tags: ['tag1', 'tag2']
    }
    const task = new Task(taskData)
    expect(task.id).not.toBeUndefined()
  })

  it('should create a new task with a given id', () => {
    const taskData = {
      id: '123',
      title: 'Task title',
      description: 'Task description',
      location: 'Task location',
      price: 100,
      dueDate: new Date(),
      media: ['image1', 'image2'],
      tags: ['tag1', 'tag2']
    }
    const task = new Task(taskData)
    expect(task.id).toBe('123')
  })
})