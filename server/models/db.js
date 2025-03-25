import { Pool } from 'pg';
import dotenv from 'dotenv';
import configuration from '../config/config';

const env = process.env.NODE_ENV || 'development';

const config = configuration[env];
const connectionString = config.url;
dotenv.config();

const db = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Required for AWS RDS
  },
});
db.connect().then(() => {
  console.log(' succefully connected to postgresDB');
}).catch((err) => {
  console.log(err.message);
});
export default db;
