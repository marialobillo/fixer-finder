"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const joi_1 = __importDefault(require("joi"));
const createUserUseCase_1 = require("../../application/use-cases/createUserUseCase");
const PostgreSQLUserRepository_1 = require("../../infrastructure/database/postgresql/PostgreSQLUserRepository");
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
    }
    async createUser(req, res) {
        try {
            console.log('Creating user...', req.body);
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
}
exports.UserController = UserController;
