import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRoleColumnToVarchar1700000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if user table exists
    const tableExists = await queryRunner.hasTable('user');
    if (tableExists) {
      // First, update existing enum values to match the new enum values
      await queryRunner.query(`UPDATE "user" SET role = 'viewer' WHERE role = 'user'`);
      await queryRunner.query(`UPDATE "user" SET role = 'admin' WHERE role = 'admin'`);
      await queryRunner.query(`UPDATE "user" SET role = 'editor' WHERE role = 'moderator'`);
      
      // Change the column type from enum to varchar(20)
      await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE VARCHAR(20) USING role::VARCHAR(20)`);
      
      // Set the default value to 'viewer'
      await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'viewer'`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Check if user table exists
    const tableExists = await queryRunner.hasTable('user');
    if (tableExists) {
      // Update values back to old enum values
      await queryRunner.query(`UPDATE "user" SET role = 'user' WHERE role = 'viewer'`);
      await queryRunner.query(`UPDATE "user" SET role = 'moderator' WHERE role = 'editor'`);
      
      // Change back to enum type
      await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE VARCHAR(20) USING role::VARCHAR(20)`);
      await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`);
    }
  }
} 