"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQLTaskRepository = void 0;
const task_1 = require("../../../domain/entities/task");
const PostgreSQLClient_1 = require("./PostgreSQLClient");
class PostgreSQLTaskRepository {
    constructor() {
        this.client = PostgreSQLClient_1.PostgreSQLClient.getInstance();
    }
    async getAll() {
        const result = await this.client.query('SELECT * FROM tasks');
        return result.map((task) => new task_1.Task(task));
    }
    async create(task) {
        const result = await this.client.query('INSERT INTO tasks (id, title, description, location, price, dueDate, media, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [
            task.id,
            task.title,
            task.description,
            task.location,
            task.price,
            task.dueDate,
            JSON.stringify(task.media),
            JSON.stringify(task.tags)
        ]);
        console.log('Query result:', result);
        if (!result || !result.rows || result.rows.length === 0) {
            throw new Error('Failed to create task, no data returned');
        }
        return new task_1.Task(result.rows[0]);
    }
}
exports.PostgreSQLTaskRepository = PostgreSQLTaskRepository;
