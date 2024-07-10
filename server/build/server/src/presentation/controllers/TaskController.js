"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const createTaskUseCase_1 = require("./../../application/use-cases/createTaskUseCase");
const getAllTasksUseCase_1 = require("../../application/use-cases/getAllTasksUseCase");
const PostgreSQLTaskRepository_1 = require("../../infrastructure/database/postgresql/PostgreSQLTaskRepository");
const joi_1 = __importDefault(require("joi"));
function isError(error) {
    return error instanceof Error;
}
const taskSchema = joi_1.default.object({
    id: joi_1.default.string().optional(),
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    dueDate: joi_1.default.date().required(),
    media: joi_1.default.array().items(joi_1.default.string()).required(),
    tags: joi_1.default.array().items(joi_1.default.string()).required()
});
class TaskController {
    constructor() {
        const taskRepository = new PostgreSQLTaskRepository_1.PostgreSQLTaskRepository();
        this.createTaskUseCase = new createTaskUseCase_1.CreateTaskUseCase(taskRepository);
        this.getAllTaskUseCase = new getAllTasksUseCase_1.GetAllTasksUseCase(taskRepository);
    }
    async createTask(req, res) {
        try {
            const { error } = taskSchema.validate(req.body);
            if (error) {
                res.status(400).json({ message: error.message });
            }
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
