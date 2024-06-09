import { Pool } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

export class PostgreSQLClient {
  private static instance: PostgreSQLClient
  private pool: Pool

  constructor() {
    this.pool = new Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE, 
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5433,
    })
  }

  public static getInstance(): PostgreSQLClient {
    if(!PostgreSQLClient.instance) {
      PostgreSQLClient.instance = new PostgreSQLClient()
    }
    return PostgreSQLClient.instance
  }

  public async query(query: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect()
    try {
      const res = await client.query(query, params)
      return res.rows 
    } catch (error) {
      console.log('Error executing query: ', error)
    } finally {
      client.release()
    }
  }
}