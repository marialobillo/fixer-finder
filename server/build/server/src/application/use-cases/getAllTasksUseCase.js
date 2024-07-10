"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTasksUseCase = void 0;
class GetAllTasksUseCase {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(params) {
        return await this.taskRepository.getAll(params);
    }
}
exports.GetAllTasksUseCase = GetAllTasksUseCase;
