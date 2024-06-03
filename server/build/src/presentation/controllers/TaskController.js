"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const createTaskUseCase_1 = require("./../../application/use-cases/createTaskUseCase");
const getAllTasksUserCase_1 = require("../../application/use-cases/getAllTasksUserCase");
const PostgreSQLTaskRepository_1 = require("../../infrastructure/database/postgresql/PostgreSQLTaskRepository");
function isError(error) {
    return error instanceof Error;
}
class TaskController {
    constructor() {
        const taskRepository = new PostgreSQLTaskRepository_1.PostgreSQLTaskRepository();
        this.createTaskUseCase = new createTaskUseCase_1.CreateTaskUseCase(taskRepository);
        this.getAllTaskUseCase = new getAllTasksUserCase_1.GetAllTasksUseCase(taskRepository);
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
    async getAllTask(req, res) {
        try {
            const tasks = await this.getAllTaskUseCase.execute();
            res.status(200).json(tasks);
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
exports.TaskController = TaskController;
