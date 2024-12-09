import { Pool } from 'pg';
import { config } from 'dotenv';
config(); 
class DatabaseServices {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT as string)
    });
  }

  async connect() {
    try {
      const client = await this.pool.connect();
      console.log('Connected to PostgreSQL successfully');
      client.release();
    } catch (err) {
      console.error('Error connecting to PostgreSQL', err);
      throw err;
    }
  }

  async query<T>(text: string, params?: any[]): Promise<T> {
    try {
      const result = await this.pool.query(text, params);
      return result.rows as T;
    } catch (error) {
      console.error('Error executing query', error);
      throw error;
    }
  }
}


const databaseServices = new DatabaseServices();
export default databaseServices
