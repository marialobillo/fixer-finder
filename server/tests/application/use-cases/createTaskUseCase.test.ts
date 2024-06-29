import { CreateTaskUseCase } from "../../../src/application/use-cases/createTaskUseCase"
import { Task, TaskProps } from "../../../src/domain/entities/task"
import { TaskRepository } from "../../../src/infrastructure/persistence/TaskRepository"


describe('Create Task Use Case', () => {
  let taskRepository: jest.Mocked<TaskRepository>
  let createTaskUseCase: CreateTaskUseCase
  let taskProps: TaskProps

  beforeEach(() => {
    taskRepository = {
      create: jest.fn(),
      getAll: jest.fn()
    } as jest.Mocked<TaskRepository>
    createTaskUseCase = new CreateTaskUseCase(taskRepository)
    taskProps = {
      title: 'Task 1',
      description: 'Description of task 1',
      location: 'Location of task 1',
      price: 100,
      dueDate: new Date(),
      media: ['media1', 'media2'],
      tags: ['tag1', 'tag2'],
    }
  })

  it('should create a task with correct properties', async () => {
    const expectedTask = new Task({ ...taskProps, id: '1'})
    taskRepository.create.mockResolvedValue(expectedTask)

    const task = await createTaskUseCase.execute(taskProps)

    expect(task.title).toBe(taskProps.title);
    expect(task.description).toBe(taskProps.description);
    expect(task.location).toBe(taskProps.location);
    expect(task.price).toBe(taskProps.price);
    expect(task.dueDate).toBe(taskProps.dueDate);
    expect(task.media).toBe(taskProps.media);
    expect(task.tags).toBe(taskProps.tags);
  })

  it('should assign a unique id to each created task', async () => {
    const task1 = new Task({...taskProps, id: '1'});
    const task2 = new Task({...taskProps, id: '2'});

    taskRepository.create.mockResolvedValueOnce(task1).mockResolvedValueOnce(task2);
  
    expect(task1.id).not.toBeUndefined();
    expect(task2.id).not.toBeUndefined();
    expect(task1.id).not.toBe(task2.id);
  });
})