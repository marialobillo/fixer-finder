"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTasksUseCase = void 0;
class GetAllTasksUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute() {
        return await this.taskRepository.getAll();
    }
}
exports.GetAllTasksUseCase = GetAllTasksUseCase;
