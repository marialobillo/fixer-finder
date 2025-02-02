import { Request, Response } from 'express';
import Joi from 'joi';
import { CreateUserUseCase } from '../../application/use-cases/createUserUseCase';
import { PostgreSQLUserRepository } from '../../infrastructure/database/postgresql/PostgreSQLUserRepository';
import { LoginUserUseCase } from '../../application/use-cases/loginUserUseCase';
import { logger } from '../../logger';

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
        logger.info(`Received request to create user: ${JSON.stringify(req.body)}`);
        try {
            const { error } = UserSchema.validate(req.body);
            if (error) {
                logger.warn(`Validation failed: ${error.message}`);
                return res.status(400).json({ message: error.message });
            }
            const userData = req.body;
            logger.info(`Calling CreateUserUseCase with data: ${JSON.stringify(userData)}`);

            const user = await this.createUserUseCase.execute(userData);
            logger.info(`Successfully created user: ${JSON.stringify(user)}`);

            res.status(201).json(user);
        } catch (error: unknown) {
            if (isError(error)) {
                logger.error(`Error while creating user: ${error.message}`, { stack: error.stack });
                return res.status(500).json({ message: error.message });
            } else {
                logger.error('An unexpected error occurred.', { error });
                return res.status(500).json({ message: 'An unexpected error occurred.' });
            }
        }
    }

    async loginUser(req: Request, res: Response): Promise<Response | void> {
        logger.info(`Received request to login user: ${JSON.stringify(req.body)}`);
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                logger.warn('Email and password are required for login.');
                return res.status(400).json({ message: 'Email and password are required.' });
            }
            logger.info(`Calling LoginUserUseCase with email: ${email}`);
            const { token } = await this.loginUserUseCase.execute({ email, password });
            logger.info(`Successfully logged in user for email: ${email}`);
            res.status(200).json({
                message: 'Login successful',
                token,
            });
        } catch (error: unknown) {
            if (isError(error)) {
                logger.error(`Error while logging in user: ${error.message}`, { stack: error.stack });
                return res.status(500).json({ message: error.message });
            } else {
                logger.error('An unexpected error occurred.', { error });
                return res.status(500).json({ message: 'An unexpected error occurred.' });
            }
        }
    }
}