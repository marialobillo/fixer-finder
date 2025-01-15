import { Request, Response } from 'express';
import Joi from 'joi';
import { CreateUserUseCase } from '../../application/use-cases/createUserUseCase';
import { PostgreSQLUserRepository } from '../../infrastructure/database/postgresql/PostgreSQLUserRepository';
import { LoginUserUseCase } from '../../application/use-cases/loginUserUseCase';

function isError(error: unknown): error is Error {
    return error instanceof Error;
}

const UserSchema = Joi.object({
    id: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    createdAt: Joi.date().optional(),
});

export class UserController {
    private createUserUseCase: CreateUserUseCase;
    private loginUserUseCase: LoginUserUseCase;

    constructor() {
        const userRepository = new PostgreSQLUserRepository();
        this.createUserUseCase = new CreateUserUseCase(userRepository);
        this.loginUserUseCase = new LoginUserUseCase(userRepository);
    }

    async createUser(req: Request, res: Response): Promise<Response | void> {
        try {
            const { error } = UserSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            const userData = req.body;
            const user = await this.createUserUseCase.execute(userData);
            res.status(201).json(user);
        } catch (error: unknown) {
            if (isError(error)) {
                return res.status(500).json({ message: error.message });
            } else {
                return res.status(500).json({ message: 'An unexpected error occurred.' });
            }
        }
    }

    async loginUser(req: Request, res: Response): Promise<Response | void> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required.' });
            }
            const { token }  = await this.loginUserUseCase.execute({ email, password });
            res.status(200).json({
                message: 'Login successful',
                token,
            });
        } catch (error: unknown) {
            if (isError(error)) {
                return res.status(500).json({ message: error.message });
            } else {
                return res.status(500).json({ message: 'An unexpected error occurred.' });
            }
        }
    }
}