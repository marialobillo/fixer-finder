import { app } from './infrastructure/express/app';
import * as dotenv from 'dotenv'
import { runMigrations } from './infrastructure/database/migrations';

dotenv.config()

const PORT = process.env.APP_PORT || 4000;

console.log('***** PORT SERVER...', PORT)

async function startServer() { 
  try {
    console.log('***** Running Migrations...')
    await runMigrations()
    app.listen(PORT, () => {
      console.log(`***** Server is running on port ${PORT}`);
    })
  } catch (error) {
    console.error('Failed to start server', error)
  }
}

startServer()