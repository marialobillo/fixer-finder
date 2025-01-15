"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const user_1 = require("../../domain/entities/user");
class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(request) {
        const { email, password } = request;
        const user = new user_1.User({ email, password });
        const createdUser = await this.userRepository.createIfNotExists(user);
        return {
            id: createdUser.id,
            email: createdUser.email,
            createdAt: createdUser.createdAt
        };
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
