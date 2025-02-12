"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQLTaskRepository = void 0;
const task_1 = require("../../../domain/entities/task");
const PostgreSQLClient_1 = require("./PostgreSQLClient");
class PostgreSQLTaskRepository {
    constructor() {
        this.client = PostgreSQLClient_1.PostgreSQLClient.getInstance();
    }
    async getAll(params) {
        const { tags, search } = params;
        let query = 'SELECT * FROM tasks';
        const conditions = [];
        const values = [];
        if (tags && tags.length > 0) {
            conditions.push(`tags @> $${conditions.length + 1}`);
            values.push(JSON.stringify(tags));
        }
        if (search) {
            conditions.push(`title ILIKE $${conditions.length + 1} OR description ILIKE $${conditions.length + 1} OR location ILIKE $${conditions.length + 1}`);
            values.push(`%${search}%`);
        }
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }
        const result = await this.client.query(query, values);
        return result.rows.map((task) => new task_1.Task(task));
    }
    async create(taskProps) {
        const task = new task_1.Task(taskProps);
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
        if (!result || !result.rows || result.rows.length === 0) {
            throw new Error('Failed to create task, no data returned');
        }
        const dbTask = result.rows[0];
        const taskRow = {
            id: dbTask.id,
            title: dbTask.title,
            description: dbTask.description,
            location: dbTask.location,
            price: dbTask.price,
            dueDate: dbTask.duedate,
            media: dbTask.media,
            tags: dbTask.tags,
        };
        return new task_1.Task(taskRow);
    }
}
exports.PostgreSQLTaskRepository = PostgreSQLTaskRepository;
