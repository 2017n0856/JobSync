import { MigrationInterface, QueryRunner } from 'typeorm';

export class SampleData1700000000001 implements MigrationInterface {
  name = 'SampleData1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert sample institutes
    await queryRunner.query(`
      INSERT INTO "institute" ("name", "country") VALUES 
      ('FAST', 'PAKISTAN'),
      ('NUST', 'PAKISTAN'),
      ('LUMS', 'PAKISTAN'),
      ('PUCIT', 'PAKISTAN'),
      ('MIT', 'US'),
      ('Stanford University', 'US')
    `);

    // Insert sample clients (persons first, then clients)
    await queryRunner.query(`
      INSERT INTO "person" ("name", "email", "country", "phone_number", "currency", "institute_id") VALUES 
      ('Ahmed Khan', 'ahmed.khan@email.com', 'PAKISTAN', '+923001234567', 'PKR', 1),
      ('Sarah Johnson', 'sarah.j@email.com', 'US', '+1234567890', 'USD', 5),
      ('Fatima Ali', 'fatima.ali@email.com', 'PAKISTAN', '+923001234568', 'PKR', 2),
      ('Michael Brown', 'michael.b@email.com', 'US', '+1234567891', 'USD', 6)
    `);

    await queryRunner.query(`
      INSERT INTO "client" ("id") VALUES 
      (1), (2), (3), (4)
    `);

    // Insert sample workers (persons first, then workers)
    await queryRunner.query(`
      INSERT INTO "person" ("name", "email", "country", "phone_number", "currency", "institute_id") VALUES 
      ('Ali Hassan', 'ali.hassan@email.com', 'PAKISTAN', '+923001234569', 'PKR', 1),
      ('Ayesha Malik', 'ayesha.malik@email.com', 'PAKISTAN', '+923001234570', 'PKR', 2),
      ('David Wilson', 'david.w@email.com', 'US', '+1234567892', 'USD', 5),
      ('Zara Ahmed', 'zara.ahmed@email.com', 'PAKISTAN', '+923001234571', 'PKR', 3),
      ('John Smith', 'john.smith@email.com', 'US', '+1234567893', 'USD', 6)
    `);

    await queryRunner.query(`
      INSERT INTO "worker" ("id") VALUES 
      (5), (6), (7), (8), (9)
    `);

    // Insert sample tasks
    await queryRunner.query(`
      INSERT INTO "task" ("name", "description", "payment_decided", "payment_received", "total_marks", "obtained_marks", "deadline", "submitted", "status", "type", "client_id", "institute_id") VALUES 
      ('Web Development Assignment', 'Create a responsive website using React and Node.js', 5000, 5000, 100, 95, '2024-02-15 23:59:59', '2024-02-14 15:30:00', 'delivered', 'assignment', 1, 1),
      ('Database Design Quiz', 'Design ERD for an e-commerce system', 2000, 2000, 50, 48, '2024-02-10 23:59:59', '2024-02-10 14:20:00', 'delivered', 'quiz', 2, 5),
      ('Machine Learning Project', 'Implement a recommendation system using Python', 8000, 6000, 100, 85, '2024-03-01 23:59:59', NULL, 'in progress', 'assignment', 3, 2),
      ('Mobile App Development', 'Build a cross-platform app using Flutter', 6000, 0, 100, NULL, '2024-03-15 23:59:59', NULL, 'unassigned', 'assignment', 4, 6),
      ('Data Structures Exam', 'Implement various data structures in Java', 3000, 3000, 100, 92, '2024-02-05 23:59:59', '2024-02-05 16:45:00', 'delivered', 'exam', 1, 1),
      ('UI/UX Design Assignment', 'Design user interface for a banking app', 4000, 4000, 100, 88, '2024-02-20 23:59:59', '2024-02-19 12:15:00', 'delivered', 'assignment', 2, 5)
    `);

    // Insert sample task assignments
    await queryRunner.query(`
      INSERT INTO "task_assignment" ("task_id", "worker_id", "budget_allocated", "payment_made") VALUES 
      (1, 5, 5000, 5000),
      (2, 7, 2000, 2000),
      (3, 6, 8000, 6000),
      (5, 5, 3000, 3000),
      (6, 8, 4000, 4000)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove sample data in reverse order
    await queryRunner.query(`DELETE FROM "task_assignment"`);
    await queryRunner.query(`DELETE FROM "task"`);
    await queryRunner.query(`DELETE FROM "worker"`);
    await queryRunner.query(`DELETE FROM "client"`);
    await queryRunner.query(`DELETE FROM "person" WHERE "id" > 0`);
    await queryRunner.query(`DELETE FROM "institute"`);

    // Reset sequences
    await queryRunner.query(`ALTER SEQUENCE "institute_id_seq" RESTART WITH 1`);
    await queryRunner.query(`ALTER SEQUENCE "person_id_seq" RESTART WITH 1`);
    await queryRunner.query(`ALTER SEQUENCE "task_id_seq" RESTART WITH 1`);
  }
}
