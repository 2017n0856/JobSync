import { MigrationInterface, QueryRunner } from 'typeorm';

export class EssentialSchemaUpdate1700000000019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Starting essential schema update...');

    // Step 1: Update Institute table
    console.log('Step 1: Updating Institute table...');
    
    // Drop existing indexes
    await queryRunner.query(`DROP INDEX IF EXISTS "public"."unique_institute"`);
    
    // Add metadata column if it doesn't exist
    const instituteTable = await queryRunner.getTable('institute');
    if (!instituteTable.findColumnByName('metadata')) {
      await queryRunner.query(`ALTER TABLE "institute" ADD "metadata" json`);
    }
    
    // Update country column to varchar(30) - modify existing column
    await queryRunner.query(`ALTER TABLE "institute" ALTER COLUMN "country" TYPE character varying(30)`);
    
    // Update timestamp columns
    await queryRunner.query(`ALTER TABLE "institute" ALTER COLUMN "created_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "institute" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "institute" ALTER COLUMN "updated_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "institute" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    
    // Create new unique index on name
    await queryRunner.query(`ALTER TABLE "institute" ADD CONSTRAINT "UQ_94af9a297299368d9fdbf6fcc76" UNIQUE ("name")`);
    await queryRunner.query(`CREATE INDEX "IDX_94af9a297299368d9fdbf6fcc7" ON "institute" ("name")`);
    
    console.log('Institute table updated successfully');

    // Step 2: Update Worker table
    console.log('Step 2: Updating Worker table...');
    
    // Make country nullable
    await queryRunner.query(`ALTER TABLE "worker" ALTER COLUMN "country" DROP NOT NULL`);
    
    // Update currency default to PKR
    await queryRunner.query(`ALTER TABLE "worker" ALTER COLUMN "currency" SET DEFAULT 'PKR'`);
    
    console.log('Worker table updated successfully');

    // Step 3: Update Client table
    console.log('Step 3: Updating Client table...');
    
    // Drop existing indexes
    await queryRunner.query(`DROP INDEX IF EXISTS "public"."unique_client_name"`);
    
    // Update name column to varchar(50) - modify existing column
    await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "name" TYPE character varying(50)`);
    
    // Update timestamp columns
    await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "created_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "created_at" SET DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "updated_at" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    
    // Create new unique index on name
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_480f88a019346eae487a0cd7f0" ON "client" ("name")`);
    
    console.log('Client table updated successfully');

    // Step 4: Update Task table
    console.log('Step 4: Updating Task table...');
    
    // Make client_id nullable
    await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "client_id" DROP NOT NULL`);
    
    // Update deadline_time default
    await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "deadline_time" SET DEFAULT '11:59:59'`);
    
    console.log('Task table updated successfully');

    console.log('Essential schema update completed successfully!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Rolling back essential schema update...');
    
    // Revert task table changes
    await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "client_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "deadline_time" DROP DEFAULT`);
    
    // Revert client table changes
    await queryRunner.query(`DROP INDEX "public"."IDX_480f88a019346eae487a0cd7f0"`);
    await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "updated_at" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "created_at" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "name" TYPE character varying(255)`);
    await queryRunner.query(`CREATE UNIQUE INDEX "unique_client_name" ON "client" ("name")`);
    
    // Revert worker table changes
    await queryRunner.query(`ALTER TABLE "worker" ALTER COLUMN "currency" SET DEFAULT 'AUD'`);
    await queryRunner.query(`ALTER TABLE "worker" ALTER COLUMN "country" SET NOT NULL`);
    
    // Revert institute table changes
    await queryRunner.query(`DROP INDEX "public"."IDX_94af9a297299368d9fdbf6fcc7"`);
    await queryRunner.query(`ALTER TABLE "institute" DROP CONSTRAINT "UQ_94af9a297299368d9fdbf6fcc76"`);
    await queryRunner.query(`ALTER TABLE "institute" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "institute" ALTER COLUMN "updated_at" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "institute" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "institute" ALTER COLUMN "created_at" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "institute" ALTER COLUMN "country" TYPE character varying(100)`);
    await queryRunner.query(`ALTER TABLE "institute" DROP COLUMN "metadata"`);
    await queryRunner.query(`CREATE UNIQUE INDEX "unique_institute" ON "institute" ("country", "name")`);
    
    console.log('Schema rollback completed');
  }
} 