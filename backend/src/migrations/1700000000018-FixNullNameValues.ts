import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixNullNameValues1700000000018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Update any null name values in client table to a default value
    await queryRunner.query(`
      UPDATE client 
      SET name = 'Unknown Client' 
      WHERE name IS NULL
    `);
    
    console.log('Fixed null name values in client table');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // This is a data fix migration, no rollback needed
    console.log('No rollback needed for data fix migration');
  }
} 