import { Pool } from 'pg';
import dotenv from 'dotenv';
import configuration from '../config/config';

const env = process.env.NODE_ENV || 'development';
const config = configuration[env];

const connectionString = config.url;
dotenv.config();
// const connectionString = process.env.DATABASE_URL;
const db = new Pool({ connectionString });
db.connect().then(() => {
  console.log(' succefully connected to postgresDB');
  console.log(connectionString);

}).catch((err) => {
  console.log(err.message);
});
export default db;
