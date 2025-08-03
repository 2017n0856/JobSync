import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropTaskAssignmentTable1700000000021 implements MigrationInterface {
  name = 'DropTaskAssignmentTable1700000000021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the task_assignment table
    await queryRunner.query(`
      DROP TABLE IF EXISTS "task_assignment" CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Recreate the task_assignment table
    await queryRunner.query(`
      CREATE TABLE "task_assignment" (
        "id" SERIAL NOT NULL,
        "task_id" integer NOT NULL,
        "worker_id" integer NOT NULL,
        "payment_decided" decimal(10,2) NOT NULL DEFAULT 0,
        "payment_made" decimal(10,2) NOT NULL DEFAULT 0,
        "metadata" json,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_task_assignment" PRIMARY KEY ("id"),
        CONSTRAINT "FK_task_assignment_task" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_task_assignment_worker" FOREIGN KEY ("worker_id") REFERENCES "worker"("id") ON DELETE CASCADE
      )
    `);
  }
} 