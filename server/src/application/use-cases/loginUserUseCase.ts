import { UserRepository } from './../../infrastructure/persistence/UserRepository';
import jwt from 'jsonwebtoken';

interface LoginRequest { 
    email: string;
    password: string;
}

interface LoginResponse { 
    token: string;
}

export class LoginUserUseCase { 
    constructor(private userRepository: UserRepository) { }

    async execute(request: LoginRequest): Promise<LoginResponse> {
        const { email, password } = request;
        
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const isPassworValid = await user.verifyPassword(password);
        if (!isPassworValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h'});

        return { token };
    }
}
