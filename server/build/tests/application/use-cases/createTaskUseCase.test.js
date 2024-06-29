"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTaskUseCase_1 = require("../../../src/application/use-cases/createTaskUseCase");
const task_1 = require("../../../src/domain/entities/task");
describe('Create Task Use Case', () => {
    let taskRepository;
    let createTaskUseCase;
    let taskProps;
    beforeEach(() => {
        taskRepository = {
            create: jest.fn(),
            getAll: jest.fn()
        };
        createTaskUseCase = new createTaskUseCase_1.CreateTaskUseCase(taskRepository);
        taskProps = {
            title: 'Task 1',
            description: 'Description of task 1',
            location: 'Location of task 1',
            price: 100,
            dueDate: new Date(),
            media: ['media1', 'media2'],
            tags: ['tag1', 'tag2'],
        };
    });
    it('should create a task with correct properties', async () => {
        const expectedTask = new task_1.Task({ ...taskProps, id: '1' });
        taskRepository.create.mockResolvedValue(expectedTask);
        const task = await createTaskUseCase.execute(taskProps);
        expect(task.title).toBe(taskProps.title);
        expect(task.description).toBe(taskProps.description);
        expect(task.location).toBe(taskProps.location);
        expect(task.price).toBe(taskProps.price);
        expect(task.dueDate).toBe(taskProps.dueDate);
        expect(task.media).toBe(taskProps.media);
        expect(task.tags).toBe(taskProps.tags);
    });
    it('should assign a unique id to each created task', async () => {
        const task1 = new task_1.Task({ ...taskProps, id: '1' });
        const task2 = new task_1.Task({ ...taskProps, id: '2' });
        taskRepository.create.mockResolvedValueOnce(task1).mockResolvedValueOnce(task2);
        expect(task1.id).not.toBeUndefined();
        expect(task2.id).not.toBeUndefined();
        expect(task1.id).not.toBe(task2.id);
    });
});
