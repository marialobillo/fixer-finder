import { User, UserProps } from '../../domain/entities/user';
import { UserRepository } from './../../infrastructure/persistence/UserRepository';

interface CreateUserRequest { 
    email: string;
    password: string;
}

interface CreateUserResponse { 
    id: string;
    email: string;
    createdAt: Date;
}

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
        const { email, password } = request;
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const user = new User({ email, password});
        const createdUser = await this.userRepository.create(user);

        return {
            id: createdUser.id!,
            email: createdUser.email,
            createdAt: createdUser.createdAt
        };
    }
}