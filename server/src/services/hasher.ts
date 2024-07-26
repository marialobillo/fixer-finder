export interface IHasher {
  hash(password: string): Promise<string>;
  compare(password: string, hashed: string): Promise<boolean>;
}