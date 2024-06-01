"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const task_1 = require("../../domain/entities/task");
class TaskRepository {
    constructor() {
        this.tasks = [];
    }
    create(taskData) {
        const task = new task_1.Task({ ...taskData });
        return task;
    }
    async save(task) {
        this.tasks.push(task);
        return task;
    }
}
exports.TaskRepository = TaskRepository;
