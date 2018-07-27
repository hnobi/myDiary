import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// const env = process.env.NODE_ENV || 'development';
const connectionString = process.env.DATABASE_URL;
const db = new Client(connectionString);

export default db;
