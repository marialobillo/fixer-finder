import { FetchTasksParams, GetAllTasksUseCase } from "../../../src/application/use-cases/getAllTasksUseCase"
import { TaskProps } from "../../../src/domain/entities/task"
import { TaskRepository } from "../../../src/infrastructure/persistence/TaskRepository"

describe('Get All Tasks Use Case', () => {
  let taskRepository: jest.Mocked<TaskRepository>
  let getAllTasksUseCase: GetAllTasksUseCase
  let taskProps: TaskProps

  beforeEach(() => {
    taskRepository = {
      create: jest.fn(),
      getAll: jest.fn()
    } as jest.Mocked<TaskRepository>

    getAllTasksUseCase = new GetAllTasksUseCase(taskRepository)

    taskProps = {
      title: 'Task 1',
      description: 'Description of task 1',
      location: 'Location of task 1',
      price: 300,
      dueDate: new Date(),
      media: ['media1', 'media2'],
      tags: ['tag1', 'tag2'],
    }
  })

  it('should return all tasks', async () => {
    const expectedTasks = [
      { ...taskProps, id: '1' },
      { ...taskProps, id: '2' },
    ]
    taskRepository.getAll.mockResolvedValue(expectedTasks)
    
    const params: FetchTasksParams = {}
    const tasks = await getAllTasksUseCase.execute(params)

    expect(tasks.length).toBe(2)
    expect(tasks[0].title).toBe(expectedTasks[0].title)
    expect(tasks[1].title).toBe(expectedTasks[1].title)
  })

  it('should return empty array if there are no tasks', async () => {
    taskRepository.getAll.mockResolvedValue([])

    const params: FetchTasksParams = {}
    const tasks = await getAllTasksUseCase.execute(params)

    expect(tasks.length).toBe(0)
  })

  it('should return filtered tasks by tags and no search attribute', async () => {
    const expectedTasks = [
      { ...taskProps, id: '1', tags: ['tag1', 'tag2'] },
      { ...taskProps, id: '2', tags: ['tag2', 'tag3'] },
    ]
    taskRepository.getAll.mockResolvedValue(expectedTasks)

    const params: FetchTasksParams = { tags: 'tag2' }
    const tasks = await getAllTasksUseCase.execute(params)

    expect(tasks.length).toBe(2)
    expect(tasks[0].tags).toContain('tag2')
    expect(tasks[1].tags).toContain('tag2')
  })

  it('shoud return filtered tasks by search and no tags attribute', async () => {
    const expectedTasks = [
      { ...taskProps, id: '1', title: 'Task 1' },
      { ...taskProps, id: '2', title: 'Task 2' },
    ]
    taskRepository.getAll.mockResolvedValue(expectedTasks)

    const params: FetchTasksParams = { search: 'Task 1' }
    const tasks = await getAllTasksUseCase.execute(params)

    expect(tasks[0].title).toBe('Task 1')
  })

  it('should return filtered tasks by tags and search attributes', async () => {
    const expectedTasks = [
      { ...taskProps, id: '1', title: 'Task 1', tags: ['tag1', 'tag2'] },
      { ...taskProps, id: '2', title: 'Task 2', tags: ['tag2', 'tag3'] },
    ]
    taskRepository.getAll.mockResolvedValue(expectedTasks)

    const params: FetchTasksParams = { tags: 'tag2', search: 'Task 1' }
    const tasks = await getAllTasksUseCase.execute(params)

    expect(tasks.length).toBe(2)
    expect(tasks[0].title).toBe('Task 1')
    expect(tasks[0].tags).toContain('tag2')
  })

})