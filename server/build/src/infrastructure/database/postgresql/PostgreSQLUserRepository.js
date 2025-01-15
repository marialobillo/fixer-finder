"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQLUserRepository = void 0;
const user_1 = require("../../../domain/entities/user");
const PostgreSQLClient_1 = require("./PostgreSQLClient");
class PostgreSQLUserRepository {
    constructor() {
        this.client = PostgreSQLClient_1.PostgreSQLClient.getInstance();
    }
    async create(user) {
        const userInstance = new user_1.User(user);
        const hashedPassword = await userInstance.hashPassword();
        const result = await this.client.query("INSERT INTO users (id, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING *", [user.id, user.email, hashedPassword, user.createdAt]);
        if (!result || !result.rows || result.rows.length === 0) {
            throw new Error('Failed to create user, no data returned');
        }
        const row = result.rows[0];
        return new user_1.User({
            id: row.id,
            email: row.email,
            password: row.password,
            createdAt: row.created_at
        });
    }
    async findByEmail(email) {
        const result = await this.client.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        console.log('row', row.email, row.password);
        return new user_1.User({
            id: row.id,
            email: row.email,
            password: row.password,
            createdAt: row.created_at
        });
    }
    async createIfNotExists(user) {
        const existingUser = await this.findByEmail(user.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const createdUser = await this.create(user);
        return createdUser;
    }
}
exports.PostgreSQLUserRepository = PostgreSQLUserRepository;
