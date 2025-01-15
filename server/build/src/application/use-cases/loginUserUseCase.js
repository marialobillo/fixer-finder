"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserUseCase = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(request) {
        const { email, password } = request;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const isPassworValid = await user.verifyPassword(password);
        if (!isPassworValid) {
            throw new Error('Invalid password');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
        return { token };
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
