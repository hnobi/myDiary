import { Client } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const client = new Client(connectionString);

client.connect();

const createTable = () => {
  const query = ` 
  DROP TABLE IF EXISTS users CASCADE;

  DROP TABLE IF EXISTS entries CASCADE;
  
  CREATE TABLE IF NOT EXISTS users(
  
    id SERIAL PRIMARY KEY,
  
    fullname VARCHAR(150) NOT NULL,
  
    username VARCHAR(100) NOT NULL,
  
    email VARCHAR(255) UNIQUE NOT NULL,
  
    password VARCHAR(255) NOT NULL,
  
    createdAt timestamptz NULL DEFAULT CURRENT_TIMESTAMP,

    reminder INTEGER  DEFAULT  0,

    image VARCHAR(255)  
  );


  CREATE TABLE IF NOT EXISTS entries(

    id SERIAL PRIMARY KEY,
  
    title VARCHAR(255) NOT NULL,
  
    entry TEXT NOT NULL,
  
    userId int REFERENCES users(id) ON DELETE CASCADE,
  
    date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP 
    
     )`;

  client.query(query, (err) => {
    if (err) {
      return err.message;
    }
    client.end();
  }
  );
};
createTable();
