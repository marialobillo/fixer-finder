import { Request, Response } from 'express';
import Joi from 'joi';
import { CreateUserUseCase } from '../../application/use-cases/createUserUseCase';
import { PostgreSQLUserRepository } from '../../infrastructure/database/postgresql/PostgreSQLUserRepository';

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

    constructor() {
        const userRepository = new PostgreSQLUserRepository();
        this.createUserUseCase = new CreateUserUseCase(userRepository);
    }

    async createUser(req: Request, res: Response): Promise<Response | void> {
        try {
            console.log('Creating user...', req.body);
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
}