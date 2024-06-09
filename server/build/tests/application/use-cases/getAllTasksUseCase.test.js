"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAllTasksUserCase_1 = require("../../../src/application/use-cases/getAllTasksUserCase");
describe('Get All Tasks Use Case', () => {
    let taskRepository;
    let getAllTasksUseCase;
    let taskProps;
    beforeEach(() => {
        taskRepository = {
            create: jest.fn(),
            getAll: jest.fn()
        };
        getAllTasksUseCase = new getAllTasksUserCase_1.GetAllTasksUseCase(taskRepository);
        taskProps = {
            title: 'Task 1',
            description: 'Description of task 1',
            location: 'Location of task 1',
            price: 300,
            dueDate: new Date(),
            media: ['media1', 'media2'],
            tags: ['tag1', 'tag2'],
        };
    });
    it('should return all tasks', async () => {
        const expectedTasks = [
            { ...taskProps, id: '1' },
            { ...taskProps, id: '2' },
        ];
        taskRepository.getAll.mockResolvedValue(expectedTasks);
        const tasks = await getAllTasksUseCase.execute();
        expect(tasks.length).toBe(2);
        expect(tasks[0].title).toBe(expectedTasks[0].title);
        expect(tasks[1].title).toBe(expectedTasks[1].title);
    });
    it('should return empty array if there are no tasks', async () => {
        taskRepository.getAll.mockResolvedValue([]);
        const tasks = await getAllTasksUseCase.execute();
        expect(tasks.length).toBe(0);
    });
});
