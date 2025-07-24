import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1700000000000 implements MigrationInterface {
    name = 'InitialMigration1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create enum types first
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('unassigned', 'in progress', 'delivered', 'cancelled', 'in revision', 'on hold')`);
        await queryRunner.query(`CREATE TYPE "public"."task_type_enum" AS ENUM('assignment', 'quiz', 'exam')`);

        // Create Institute table
        await queryRunner.query(`CREATE TABLE "institute" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "country" character varying, CONSTRAINT "UQ_8b5c0c8c8c8c8c8c8c8c8c8c8c" UNIQUE ("name"), CONSTRAINT "PK_institute" PRIMARY KEY ("id"))`);

        // Create Person table (base table for Client and Worker)
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50), "country" character varying NOT NULL, "phone_number" character varying(13) NOT NULL, "currency" character varying, "institute_id" integer, CONSTRAINT "UQ_person_phone" UNIQUE ("phone_number"), CONSTRAINT "PK_person" PRIMARY KEY ("id"))`);

        // Create Client table (inherits from Person)
        await queryRunner.query(`CREATE TABLE "client" ("id" integer NOT NULL, CONSTRAINT "PK_client" PRIMARY KEY ("id"))`);

        // Create Worker table (inherits from Person)
        await queryRunner.query(`CREATE TABLE "worker" ("id" integer NOT NULL, CONSTRAINT "PK_worker" PRIMARY KEY ("id"))`);

        // Create Task table
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(300), "payment_decided" integer NOT NULL DEFAULT '0', "payment_received" integer NOT NULL DEFAULT '0', "total_marks" integer, "obtained_marks" integer, "deadline" TIMESTAMP, "submitted" TIMESTAMP, "status" "public"."task_status_enum" NOT NULL DEFAULT 'unassigned', "type" "public"."task_type_enum" NOT NULL DEFAULT 'assignment', "client_id" integer, "institute_id" integer, CONSTRAINT "PK_task" PRIMARY KEY ("id"))`);

        // Create TaskAssignment table
        await queryRunner.query(`CREATE TABLE "task_assignment" ("task_id" integer NOT NULL, "worker_id" integer NOT NULL, "budget_allocated" integer NOT NULL DEFAULT '0', "payment_made" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_task_assignment" PRIMARY KEY ("task_id", "worker_id"))`);

        // Add foreign key constraints
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_person_institute" FOREIGN KEY ("institute_id") REFERENCES "institute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_client_person" FOREIGN KEY ("id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_worker_person" FOREIGN KEY ("id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_task_client" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_task_institute" FOREIGN KEY ("institute_id") REFERENCES "institute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_assignment" ADD CONSTRAINT "FK_task_assignment_task" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_assignment" ADD CONSTRAINT "FK_task_assignment_worker" FOREIGN KEY ("worker_id") REFERENCES "worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints
        await queryRunner.query(`ALTER TABLE "task_assignment" DROP CONSTRAINT "FK_task_assignment_worker"`);
        await queryRunner.query(`ALTER TABLE "task_assignment" DROP CONSTRAINT "FK_task_assignment_task"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_task_institute"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_task_client"`);
        await queryRunner.query(`ALTER TABLE "worker" DROP CONSTRAINT "FK_worker_person"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_client_person"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_person_institute"`);

        // Drop tables
        await queryRunner.query(`DROP TABLE "task_assignment"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "worker"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "institute"`);

        // Drop enum types
        await queryRunner.query(`DROP TYPE "public"."task_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
    }
} 