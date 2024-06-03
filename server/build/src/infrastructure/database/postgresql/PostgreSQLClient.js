"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQLClient = void 0;
const pg_1 = require("pg");
class PostgreSQLClient {
    constructor() {
        this.pool = new pg_1.Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'foreasybooking',
            password: 'postgres',
            port: 5432,
        });
    }
    static getInstance() {
        if (!PostgreSQLClient.instance) {
            PostgreSQLClient.instance = new PostgreSQLClient();
        }
        return PostgreSQLClient.instance;
    }
    async query(query, params) {
        const client = await this.pool.connect();
        try {
            const res = await client.query(query, params);
            return res.rows;
        }
        catch (error) {
            console.log('Error executing query: ', error);
        }
        finally {
            client.release();
        }
    }
}
exports.PostgreSQLClient = PostgreSQLClient;
