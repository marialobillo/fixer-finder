import { User, UserProps } from '../../domain/entities/user';
import { UserRepository } from '../../infrastructure/persistence/UserRepository';
import { IHasher } from '../../services/hasher';

export class RegisterUserUseCase {
  private userRepository: UserRepository
  private hasher: IHasher

  constructor(userRepository: UserRepository, hasher: IHasher) {
    this.userRepository = userRepository
    this.hasher = hasher
  }

  async execute(userData: UserProps): Promise<User> {
    const { email, password } = userData

    const existingUser = await this.userRepository.findByEmail(email)
    if(existingUser) {
      throw new Error('User already exists')
    }
    const hashedPassword = await this.hasher.hash(password)
    const newUser = new User({
      ...userData,
      password: hashedPassword
    })
    await this.userRepository.save(newUser)
    return newUser
  }
} 

