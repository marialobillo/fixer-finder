import { User, UserProps } from '../../../domain/entities/user';
import { UserRepository } from '../../persistence/UserRepository';
import { PostgreSQLClient } from './PostgreSQLClient';

export class PostgreSQLUserRepository implements UserRepository {
  private client: PostgreSQLClient

  constructor() {
    this.client = PostgreSQLClient.getInstance()
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.client.query('SELECT * FROM users WHERE email = $1', [email])
    if(result.rows.length === 0) {
      return null
    }
    const dbUser = result.rows[0]
    const userProps: UserProps = {
      id: dbUser.id,
      email: dbUser.email,
      password: dbUser.password,
      username: dbUser.username,
      role: dbUser.role
    }
    return new User(userProps)
  }

  async save(user: User): Promise<void> {
    const { id, username, email, password, role } = user
    await this.client.query(
      'INSERT INTO users (id, username, email, password, role) VALUES ($1, $2, $3, $4, $5)',
      [id, username, email, password, role]
    )
  }
}