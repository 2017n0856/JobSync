import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserTableToSnakeCase1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if columns exist before renaming
    const tableExists = await queryRunner.hasTable('user');
    if (tableExists) {
      // Check if phoneNumber column exists and rename to phone_number
      const phoneNumberExists = await queryRunner.hasColumn('user', 'phoneNumber');
      if (phoneNumberExists) {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "phoneNumber" TO "phone_number"`);
      }

      // Check if createdAt column exists and rename to created_at
      const createdAtExists = await queryRunner.hasColumn('user', 'createdAt');
      if (createdAtExists) {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "createdAt" TO "created_at"`);
      }

      // Check if updatedAt column exists and rename to updated_at
      const updatedAtExists = await queryRunner.hasColumn('user', 'updatedAt');
      if (updatedAtExists) {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "updatedAt" TO "updated_at"`);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Check if columns exist before renaming back
    const tableExists = await queryRunner.hasTable('user');
    if (tableExists) {
      // Check if phone_number column exists and rename back to phoneNumber
      const phoneNumberExists = await queryRunner.hasColumn('user', 'phone_number');
      if (phoneNumberExists) {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "phone_number" TO "phoneNumber"`);
      }

      // Check if created_at column exists and rename back to createdAt
      const createdAtExists = await queryRunner.hasColumn('user', 'created_at');
      if (createdAtExists) {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "created_at" TO "createdAt"`);
      }

      // Check if updated_at column exists and rename back to updatedAt
      const updatedAtExists = await queryRunner.hasColumn('user', 'updated_at');
      if (updatedAtExists) {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "updated_at" TO "updatedAt"`);
      }
    }
  }
} 