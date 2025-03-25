import { Client } from 'pg';
import dotenv from 'dotenv';
import configuration from '../config/config';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = configuration[env];
const connectionString = config.url;

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
const createTables = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const query = `
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS entries CASCADE;

      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        fullname VARCHAR(150) NOT NULL,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        reminder INTEGER DEFAULT 0,
        image VARCHAR(255)
      );

      CREATE TABLE entries(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        entry TEXT NOT NULL,
        userId INT REFERENCES users(id) ON DELETE CASCADE,
        date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(query);
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
};

createTables();
