import { User } from '../../domain/user';



interface RegisterUserRequest {
    username: string
    email: string
    password: string
    role: string
}

export class RegisterUserUseCase {
    constructor(
      private userRepository: UserRepository,
      private hasher: IHasher
    ) {
    }


    async execute(request: RegisterUserRequest): Promise<User> {
        const { username, email, password, role } = request

        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser) {
            throw new Error('User already exists')
        }

        const hashedPassword = await this.hasher.hash(password)

        const user = new User(
          Date.now().toString(),
          username,
          email, 
          hashedPassword,
        )

        await this.userRepository.save(user)
        
        return user
    }
}