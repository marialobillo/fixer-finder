"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskController = void 0;
const createTaskUseCase_1 = require("./../../application/use-cases/createTaskUseCase");
const TaskRepository_1 = require("../../infrastructure/persistence/TaskRepository");
function isError(error) {
    return error instanceof Error;
}
class createTaskController {
    constructor() {
        const taskRepository = new TaskRepository_1.TaskRepository();
        this.createTaskUseCase = new createTaskUseCase_1.CreateTaskUseCase(taskRepository);
    }
    async createTask(req, res) {
        try {
            const taskData = req.body;
            const task = await this.createTaskUseCase.execute(taskData);
            res.status(201).json(task);
        }
        catch (error) {
            if (isError(error)) {
                res.status(500).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'An unexpected error occurred.' });
            }
        }
    }
}
exports.createTaskController = createTaskController;
