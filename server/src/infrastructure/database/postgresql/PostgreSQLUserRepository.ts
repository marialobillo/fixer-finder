import { User, UserProps } from '../../../domain/entities/user';
import { PostgreSQLClient } from './PostgreSQLClient';

export class PostgreSQLUserRepository {
    private client: PostgreSQLClient;

    constructor() {
        this.client = PostgreSQLClient.getInstance();
    }

    async create(user: UserProps): Promise<User> {
        const hashedPassword = await User.hashPassword(user.password);
        const result = await this.client.query(
            "INSERT INTO users (id, email, password, created_at) VALUES ($1, $2, $3, $4)",
            [user.id, user.email, user.password, user.createdAt]
        );
        if (!result || !result.rows || result.rows.length === 0) {
            throw new Error('Failed to create user, no data returned');
        }

        const row = result.rows[0];
        return new User({
            id: row.id,
            email: row.email,
            password: hashedPassword,
            createdAt: row.created_at,
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await this.client.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];
        return new User({
            id: row.id,
            email: row.email,
            password: row.password,
            createdAt: row.created_at
        });
    }
}