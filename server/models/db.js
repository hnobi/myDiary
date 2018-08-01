import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = process.env.DATABASE_URL;
const db = new Pool({ connectionString });
db.connect().then(() => {
  console.log(' succefully connected to postgresDB');
}).catch((err) => {
  console.log(err.message);
});
export default db;
