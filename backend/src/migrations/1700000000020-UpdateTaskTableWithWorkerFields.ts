import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTaskTableWithWorkerFields1700000000020 implements MigrationInterface {
  name = 'UpdateTaskTableWithWorkerFields1700000000020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add worker_id column
    await queryRunner.query(`
      ALTER TABLE "task" 
      ADD COLUMN "worker_id" integer
    `);

    // Add foreign key constraint for worker_id
    await queryRunner.query(`
      ALTER TABLE "task" 
      ADD CONSTRAINT "FK_task_worker" 
      FOREIGN KEY ("worker_id") REFERENCES "worker"("id") ON DELETE SET NULL
    `);

    // Rename payment columns
    await queryRunner.query(`
      ALTER TABLE "task" 
      RENAME COLUMN "payment_decided" TO "client_payment_decided"
    `);

    await queryRunner.query(`
      ALTER TABLE "task" 
      RENAME COLUMN "payment_made" TO "client_payment_made"
    `);

    // Add worker payment columns
    await queryRunner.query(`
      ALTER TABLE "task" 
      ADD COLUMN "worker_payment_decided" decimal(10,2) NOT NULL DEFAULT 0
    `);

    await queryRunner.query(`
      ALTER TABLE "task" 
      ADD COLUMN "worker_payment_made" decimal(10,2) NOT NULL DEFAULT 0
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove worker payment columns
    await queryRunner.query(`
      ALTER TABLE "task" 
      DROP COLUMN "worker_payment_made"
    `);

    await queryRunner.query(`
      ALTER TABLE "task" 
      DROP COLUMN "worker_payment_decided"
    `);

    // Rename payment columns back
    await queryRunner.query(`
      ALTER TABLE "task" 
      RENAME COLUMN "client_payment_made" TO "payment_made"
    `);

    await queryRunner.query(`
      ALTER TABLE "task" 
      RENAME COLUMN "client_payment_decided" TO "payment_decided"
    `);

    // Remove foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "task" 
      DROP CONSTRAINT "FK_task_worker"
    `);

    // Remove worker_id column
    await queryRunner.query(`
      ALTER TABLE "task" 
      DROP COLUMN "worker_id"
    `);
  }
} 