import { MigrationInterface, QueryRunner } from 'typeorm';

export class RecreateInstituteTable1700000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the existing table if it exists
    await queryRunner.query('DROP TABLE IF EXISTS institute CASCADE');
    
    // Create the table with proper constraints
    await queryRunner.query(`
      CREATE TABLE institute (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        country VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create index on name
    await queryRunner.query('CREATE INDEX idx_institute_name ON institute(name)');
    
    // Add trigger for updated_at
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);
    
    await queryRunner.query(`
      CREATE TRIGGER update_institute_updated_at 
      BEFORE UPDATE ON institute 
      FOR EACH ROW 
      EXECUTE FUNCTION update_updated_at_column();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS institute CASCADE');
  }
} 