import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnablePgTrgmExtension1700000000006 implements MigrationInterface {
  name = 'EnablePgTrgmExtension1700000000006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable the pg_trgm extension for fuzzy search functionality
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Disable the pg_trgm extension
    await queryRunner.query(`DROP EXTENSION IF EXISTS pg_trgm`);
  }
} 