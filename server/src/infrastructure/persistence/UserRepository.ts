import { User, UserProps } from '../../domain/entities/user';

export interface UserRepository {
    create(userData: UserProps): Promise<User>
    findByEmail(email: string): Promise<User | null>
    udpatePassword(userId: string, password: string): Promise<void>
    findById(userId: string): Promise<User | null>
}