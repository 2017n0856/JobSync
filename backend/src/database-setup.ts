import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function createDatabaseIfNotExists() {
  const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: 'postgres', // Connect to default postgres database
  });

  try {
    await client.connect();

    // Check if database exists
    const result = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [process.env.DATABASE_NAME || 'jobsync'],
    );

    if (result.rows.length === 0) {
      console.log(
        `Creating database: ${process.env.DATABASE_NAME || 'jobsync'}`,
      );
      await client.query(
        `CREATE DATABASE "${process.env.DATABASE_NAME || 'jobsync'}"`,
      );
      console.log('Database created successfully!');
    } else {
      console.log(
        `Database ${process.env.DATABASE_NAME || 'jobsync'} already exists.`,
      );
    }
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run if this file is executed directly
if (require.main === module) {
  createDatabaseIfNotExists()
    .then(() => {
      console.log('Database setup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database setup failed:', error);
      process.exit(1);
    });
}

export { createDatabaseIfNotExists };
