"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskUseCase = void 0;
class CreateTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(taskData) {
        const task = await this.taskRepository.create(taskData);
        return task;
    }
}
exports.CreateTaskUseCase = CreateTaskUseCase;
