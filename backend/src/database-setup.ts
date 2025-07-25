import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  // First, connect to default postgres database to create our database
  const defaultClient = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: 'postgres', // Connect to default postgres database
  });

  try {
    await defaultClient.connect();
    console.log('🔄 Connecting to PostgreSQL...');
    
    // Check if database exists
    const dbResult = await defaultClient.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DATABASE_NAME || 'jobsync']
    );

    if (dbResult.rows.length === 0) {
      console.log(`📦 Creating database: ${process.env.DATABASE_NAME || 'jobsync'}`);
      await defaultClient.query(`CREATE DATABASE "${process.env.DATABASE_NAME || 'jobsync'}"`);
      console.log('✅ Database created successfully!');
    } else {
      console.log(`✅ Database ${process.env.DATABASE_NAME || 'jobsync'} already exists.`);
    }
  } catch (error) {
    console.error('❌ Error creating database:', error);
    throw error;
  } finally {
    await defaultClient.end();
  }

  // Now connect to our database to create tables
  const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'jobsync',
  });

  try {
    await client.connect();
    console.log('🔄 Creating tables and inserting sample data...');

    // Create enum types
    await client.query(`
      DO $$ BEGIN
        CREATE TYPE "public"."task_status_enum" AS ENUM('unassigned', 'in progress', 'delivered', 'cancelled', 'in revision', 'on hold');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await client.query(`
      DO $$ BEGIN
        CREATE TYPE "public"."task_type_enum" AS ENUM('assignment', 'quiz', 'exam');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create tables if they don't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS "institute" (
        "id" SERIAL PRIMARY KEY,
        "name" character varying(100) NOT NULL UNIQUE,
        "country" character varying
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "person" (
        "id" SERIAL PRIMARY KEY,
        "name" character varying(50) NOT NULL,
        "email" character varying(50),
        "country" character varying NOT NULL,
        "phone_number" character varying(13) NOT NULL UNIQUE,
        "currency" character varying,
        "institute_id" integer REFERENCES "institute"("id")
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "client" (
        "id" integer PRIMARY KEY REFERENCES "person"("id")
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "worker" (
        "id" integer PRIMARY KEY REFERENCES "person"("id")
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "task" (
        "id" SERIAL PRIMARY KEY,
        "name" character varying(100) NOT NULL,
        "description" character varying(300),
        "payment_decided" integer NOT NULL DEFAULT 0,
        "payment_received" integer NOT NULL DEFAULT 0,
        "total_marks" integer,
        "obtained_marks" integer,
        "deadline" TIMESTAMP,
        "submitted" TIMESTAMP,
        "status" "public"."task_status_enum" NOT NULL DEFAULT 'unassigned',
        "type" "public"."task_type_enum" NOT NULL DEFAULT 'assignment',
        "client_id" integer REFERENCES "client"("id"),
        "institute_id" integer REFERENCES "institute"("id")
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "task_assignment" (
        "task_id" integer REFERENCES "task"("id"),
        "worker_id" integer REFERENCES "worker"("id"),
        "budget_allocated" integer NOT NULL DEFAULT 0,
        "payment_made" integer NOT NULL DEFAULT 0,
        PRIMARY KEY ("task_id", "worker_id")
      );
    `);

    console.log('✅ Tables created successfully!');

    // Check if sample data exists
    const instituteCount = await client.query('SELECT COUNT(*) FROM "institute"');
    
    if (parseInt(instituteCount.rows[0].count) === 0) {
      console.log('📊 Inserting sample data...');

      // Insert sample institutes
      await client.query(`
        INSERT INTO "institute" ("name", "country") VALUES 
        ('FAST', 'PAKISTAN'),
        ('NUST', 'PAKISTAN'),
        ('LUMS', 'PAKISTAN'),
        ('PUCIT', 'PAKISTAN'),
        ('MIT', 'US'),
        ('Stanford University', 'US')
        ON CONFLICT (name) DO NOTHING;
      `);

      // Insert sample persons (clients and workers)
      await client.query(`
        INSERT INTO "person" ("name", "email", "country", "phone_number", "currency", "institute_id") VALUES 
        ('Ahmed Khan', 'ahmed.khan@email.com', 'PAKISTAN', '+923001234567', 'PKR', 1),
        ('Sarah Johnson', 'sarah.j@email.com', 'US', '+1234567890', 'USD', 5),
        ('Fatima Ali', 'fatima.ali@email.com', 'PAKISTAN', '+923001234568', 'PKR', 2),
        ('Michael Brown', 'michael.b@email.com', 'US', '+1234567891', 'USD', 6),
        ('Ali Hassan', 'ali.hassan@email.com', 'PAKISTAN', '+923001234569', 'PKR', 1),
        ('Ayesha Malik', 'ayesha.malik@email.com', 'PAKISTAN', '+923001234570', 'PKR', 2),
        ('David Wilson', 'david.w@email.com', 'US', '+1234567892', 'USD', 5),
        ('Zara Ahmed', 'zara.ahmed@email.com', 'PAKISTAN', '+923001234571', 'PKR', 3),
        ('John Smith', 'john.smith@email.com', 'US', '+1234567893', 'USD', 6)
        ON CONFLICT (phone_number) DO NOTHING;
      `);

      // Insert clients
      await client.query(`
        INSERT INTO "client" ("id") VALUES (1), (2), (3), (4)
        ON CONFLICT (id) DO NOTHING;
      `);

      // Insert workers
      await client.query(`
        INSERT INTO "worker" ("id") VALUES (5), (6), (7), (8), (9)
        ON CONFLICT (id) DO NOTHING;
      `);

      // Insert sample tasks
      await client.query(`
        INSERT INTO "task" ("name", "description", "payment_decided", "payment_received", "total_marks", "obtained_marks", "deadline", "submitted", "status", "type", "client_id", "institute_id") VALUES 
        ('Web Development Assignment', 'Create a responsive website using React and Node.js', 5000, 5000, 100, 95, '2024-02-15 23:59:59', '2024-02-14 15:30:00', 'delivered', 'assignment', 1, 1),
        ('Database Design Quiz', 'Design ERD for an e-commerce system', 2000, 2000, 50, 48, '2024-02-10 23:59:59', '2024-02-10 14:20:00', 'delivered', 'quiz', 2, 5),
        ('Machine Learning Project', 'Implement a recommendation system using Python', 8000, 6000, 100, 85, '2024-03-01 23:59:59', NULL, 'in progress', 'assignment', 3, 2),
        ('Mobile App Development', 'Build a cross-platform app using Flutter', 6000, 0, 100, NULL, '2024-03-15 23:59:59', NULL, 'unassigned', 'assignment', 4, 6),
        ('Data Structures Exam', 'Implement various data structures in Java', 3000, 3000, 100, 92, '2024-02-05 23:59:59', '2024-02-05 16:45:00', 'delivered', 'exam', 1, 1),
        ('UI/UX Design Assignment', 'Design user interface for a banking app', 4000, 4000, 100, 88, '2024-02-20 23:59:59', '2024-02-19 12:15:00', 'delivered', 'assignment', 2, 5);
      `);

      // Insert sample task assignments
      await client.query(`
        INSERT INTO "task_assignment" ("task_id", "worker_id", "budget_allocated", "payment_made") VALUES 
        (1, 5, 5000, 5000),
        (2, 7, 2000, 2000),
        (3, 6, 8000, 6000),
        (5, 5, 3000, 3000),
        (6, 8, 4000, 4000);
      `);

      console.log('✅ Sample data inserted successfully!');
    } else {
      console.log('✅ Sample data already exists!');
    }

    console.log('🎉 Database setup completed successfully!');
    console.log('📊 Database contains:');
    console.log('   - 6 Institutes');
    console.log('   - 4 Clients');
    console.log('   - 5 Workers');
    console.log('   - 6 Tasks');
    console.log('   - 5 Task Assignments');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run if this file is executed directly
if (require.main === module) {
  setupDatabase()
    .then(() => {
      console.log('🚀 Ready to start the application!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Database setup failed:', error);
      process.exit(1);
    });
}

export { setupDatabase }; 