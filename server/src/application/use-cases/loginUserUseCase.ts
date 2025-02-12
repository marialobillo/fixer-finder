import { UserRepository } from './../../infrastructure/persistence/UserRepository';
import jwt from 'jsonwebtoken';
import { logger } from '../../logger';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginUserResponse {
    token: string;
}

export class LoginUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(request: LoginRequest): Promise<LoginUserResponse> {
        const { email, password } = request;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            logger.error('User not found');
            throw new Error('User not found');
        }
        const isPassworValid = await user.verifyPassword(password);
        if (!isPassworValid) {
            logger.error('Invalid password');
            throw new Error('Invalid password');
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '2h'});
        return { token };
    }
}
