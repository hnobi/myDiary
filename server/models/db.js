import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let connectionString;
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_URL;
} else {
  connectionString = process.env.DATABASE_URL;
}

console.log(connectionString);


const db = new Pool({ connectionString });
db.connect().then(() => {
  console.log(' succefully connected to postgresDB');
}).catch((err) => {
  console.log(err.message);
});
export default db;
