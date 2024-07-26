import bcrypt from 'bcryptjs'
import { IHasher } from '../../services/hasher'

export class BryptHasher implements IHasher {
  private saltRounds = 10

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds)
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed)
  }
}