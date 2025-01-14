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
        const user = new User({ email, password });
        await user.hashPassword();
        const createdUser = await this.userRepository.createIfNotExists(user);
        return {
            id: createdUser.id!,
            email: createdUser.email,
            createdAt: createdUser.createdAt
        };
    }
}