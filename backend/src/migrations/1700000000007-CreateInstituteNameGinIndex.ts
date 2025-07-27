import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInstituteNameGinIndex1700000000007 implements MigrationInterface {
  name = 'CreateInstituteNameGinIndex1700000000007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create a GIN index on the institute name for fuzzy search performance
    // This index will be used by the similarity function for faster searches
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_institute_name_gin 
      ON institute 
      USING gin (name gin_trgm_ops)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the GIN index
    await queryRunner.query(`DROP INDEX IF EXISTS idx_institute_name_gin`);
  }
} 