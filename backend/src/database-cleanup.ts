import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function cleanupDatabase() {
  const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'jobsync',
  });

  try {
    await client.connect();
    console.log('Connected to database for cleanup...');
    
    // Drop all tables and types in the correct order
    console.log('Dropping existing tables and types...');
    
    // Drop foreign key constraints first
    await client.query(`DROP TABLE IF EXISTS "task_assignment" CASCADE`);
    await client.query(`DROP TABLE IF EXISTS "task" CASCADE`);
    await client.query(`DROP TABLE IF EXISTS "worker" CASCADE`);
    await client.query(`DROP TABLE IF EXISTS "client" CASCADE`);
    await client.query(`DROP TABLE IF EXISTS "person" CASCADE`);
    await client.query(`DROP TABLE IF EXISTS "institute" CASCADE`);
    
    // Drop enum types
    await client.query(`DROP TYPE IF EXISTS "public"."task_type_enum" CASCADE`);
    await client.query(`DROP TYPE IF EXISTS "public"."task_status_enum" CASCADE`);
    
    console.log('Database cleaned successfully!');
    console.log('You can now run: npm run migration:run');
    
  } catch (error) {
    console.error('Error cleaning database:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run if this file is executed directly
if (require.main === module) {
  cleanupDatabase()
    .then(() => {
      console.log('Database cleanup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database cleanup failed:', error);
      process.exit(1);
    });
}

export { cleanupDatabase }; 