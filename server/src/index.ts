import { app } from './infrastructure/express/app';
import * as dotenv from 'dotenv'
import { runMigrations } from './infrastructure/database/migrations';
import { logger } from './logger';

dotenv.config()

const PORT = process.env.APP_PORT || 4000;

console.log('***** PORT SERVER...', PORT)

async function startServer() { 
  try {
    console.log('***** Running Migrations...')
    await runMigrations()
    app.listen(PORT, () => {
      logger.info(`Server is running on: http://localhost:${PORT}`)
    })
  } catch (error) {
    logger.error('Failed to start server', error)
  }
}

startServer()