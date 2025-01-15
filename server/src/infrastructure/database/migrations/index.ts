import { PostgreSQLClient } from './../postgresql/PostgreSQLClient';
import { createUsersTable } from './createUsersTable';
import { createOffersTable } from './createOffersTable';
import { createTasksTable } from './createTasksTable';

async function runMigrations() { 
    const dbClient = PostgreSQLClient.getInstance();

    const migrations = [
        { name: 'CreateUsersTable', query: createUsersTable },
        { name: 'CreateOffersTable', query: createOffersTable },
        { name: 'CreateTasksTable', query: createTasksTable },
    ];

    for (const migration of migrations) {
        try { 
            console.log(`Running migration: ${migration.name}`);
            await dbClient.query(migration.query);
            console.log(`Migration completed Successfully - ${migration.name}`)
        } catch (error) {
            console.error(`Failed to run migration: ${migration.name}`, error);
            process.exit(1);
        }
    }

    console.log('All migrations ran successfully.')
}

export { runMigrations };

