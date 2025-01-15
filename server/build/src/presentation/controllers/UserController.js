"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const joi_1 = __importDefault(require("joi"));
const createUserUseCase_1 = require("../../application/use-cases/createUserUseCase");
const PostgreSQLUserRepository_1 = require("../../infrastructure/database/postgresql/PostgreSQLUserRepository");
const loginUserUseCase_1 = require("../../application/use-cases/loginUserUseCase");
function isError(error) {
    return error instanceof Error;
}
const UserSchema = joi_1.default.object({
    id: joi_1.default.string().optional(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
    createdAt: joi_1.default.date().optional(),
});
class UserController {
    constructor() {
        const userRepository = new PostgreSQLUserRepository_1.PostgreSQLUserRepository();
        this.createUserUseCase = new createUserUseCase_1.CreateUserUseCase(userRepository);
        this.loginUserUseCase = new loginUserUseCase_1.LoginUserUseCase(userRepository);
    }
    async createUser(req, res) {
        try {
            const { error } = UserSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            const userData = req.body;
            const user = await this.createUserUseCase.execute(userData);
            res.status(201).json(user);
        }
        catch (error) {
            if (isError(error)) {
                return res.status(500).json({ message: error.message });
            }
            else {
                return res.status(500).json({ message: 'An unexpected error occurred.' });
            }
        }
    }
    async loginUser(req, res) {
        try {
            console.log('Logging in user...', req.body);
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required.' });
            }
            // Login logic here
            const token = await this.loginUserUseCase.execute({ email, password });
            res.status(200).json({ message: 'Login successful' });
        }
        catch (error) {
            if (isError(error)) {
                return res.status(500).json({ message: error.message });
            }
            else {
                return res.status(500).json({ message: 'An unexpected error occurred.' });
            }
        }
    }
}
exports.UserController = UserController;
