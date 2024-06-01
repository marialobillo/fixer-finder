"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskUseCase = void 0;
class CreateTaskUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(taskData) {
        const task = this.taskRepository.create(taskData);
        return await this.taskRepository.save(task);
    }
}
exports.CreateTaskUseCase = CreateTaskUseCase;
