import { Pool } from 'pg'

export class PostgreSQLClient {
  private static instance: PostgreSQLClient
  private pool: Pool

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'foreasybooking', 
      password: 'foreasybooking',
      port: 5433,
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