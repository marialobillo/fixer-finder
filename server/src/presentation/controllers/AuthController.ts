import { Request, Response } from 'express';
import Joi from 'joi';
import { RegisterUserUseCase } from '../../application/use-cases/registerUserUseCase';
import { PostgreAQRepository } from '../../infrastructure/database/postgresql/PostgreAQRepository';
import { BcryptHasher } from '../../services/hasher';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().required()
});

export class AuthController {
  private registerUserUseCase: RegisterUserUseCase;

  constructor() {
    const userRepository = new PostgreAQRepository();
    const hasher = new BcryptHasher();
    this.registerUserUseCase = new RegisterUserUseCase(userRepository, hasher);
  }

  async registerUser(req: Request, res: Response): Promise<Response | void> {
    try {
      const { error } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      
      const userData = req.body;
      const user = await this.registerUserUseCase.execute(userData);
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