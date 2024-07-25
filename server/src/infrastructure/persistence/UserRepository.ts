import { User } from '../../domain/entities/user';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<void>
}