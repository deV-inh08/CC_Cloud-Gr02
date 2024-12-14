import { Pool } from 'pg';
import { config } from 'dotenv';
import { Connector } from "@google-cloud/cloud-sql-connector"

config();  
class DatabaseServices {
  private pool: Pool;
  constructor() {
    this.pool = new Pool({});
  }

  async connect() {
    try {
      const connector = new Connector();
      const clientOpts = await connector.getOptions({
        instanceConnectionName: 'nlu-gcp-hk241-group01:us-central1:cc-group02',
      });
      this.pool = new Pool({
        ...clientOpts,
        user: process.env.DB_USER, 
        password: process.env.DB_PASSWORD, 
        database: process.env.DB_NAME,
      })
      const client = await this.pool.connect();
      console.log('Connected to PostgreSQL successfully');
      client.release();  
    } catch (err) {
      console.error('Error connecting to PostgreSQL via Cloud SQL', err);
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
export default databaseServices;
