"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrations = void 0;
const PostgreSQLClient_1 = require("./../postgresql/PostgreSQLClient");
const createUsersTable_1 = require("./createUsersTable");
const createOffersTable_1 = require("./createOffersTable");
const createTasksTable_1 = require("./createTasksTable");
async function runMigrations() {
    const dbClient = PostgreSQLClient_1.PostgreSQLClient.getInstance();
    const migrations = [
        { name: 'CreateUsersTable', query: createUsersTable_1.createUsersTable },
        { name: 'CreateOffersTable', query: createOffersTable_1.createOffersTable },
        { name: 'CreateTasksTable', query: createTasksTable_1.createTasksTable },
    ];
    for (const migration of migrations) {
        try {
            console.log(`Running migration: ${migration.name}`);
            await dbClient.query(migration.query);
            console.log(`Migration completed Successfully - ${migration.name}`);
        }
        catch (error) {
            console.error(`Failed to run migration: ${migration.name}`, error);
            process.exit(1);
        }
    }
    console.log('All migrations ran successfully.');
}
exports.runMigrations = runMigrations;
