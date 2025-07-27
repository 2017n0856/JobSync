import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixInstituteTableConstraints1700000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // First, check if institute table exists
    const tableExists = await queryRunner.hasTable('institute');
    
    if (tableExists) {
      // Check if there are any records with null names
      const nullNameRecords = await queryRunner.query(
        'SELECT COUNT(*) as count FROM institute WHERE name IS NULL'
      );
      
      if (nullNameRecords[0].count > 0) {
        // Delete records with null names or update them with a default value
        await queryRunner.query(
          'DELETE FROM institute WHERE name IS NULL'
        );
      }
      
      // Now we can safely add the NOT NULL constraint
      await queryRunner.query(
        'ALTER TABLE institute ALTER COLUMN name SET NOT NULL'
      );
      
      // Add unique constraint if it doesn't exist
      const uniqueConstraintExists = await queryRunner.query(
        `SELECT constraint_name FROM information_schema.table_constraints 
         WHERE table_name = 'institute' AND constraint_type = 'UNIQUE' 
         AND constraint_name LIKE '%name%'`
      );
      
      if (uniqueConstraintExists.length === 0) {
        await queryRunner.query(
          'ALTER TABLE institute ADD CONSTRAINT UQ_institute_name UNIQUE (name)'
        );
      }
      
      // Add NOT NULL constraint to country if it doesn't exist
      await queryRunner.query(
        'ALTER TABLE institute ALTER COLUMN country SET NOT NULL'
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove constraints in reverse order
    await queryRunner.query(
      'ALTER TABLE institute ALTER COLUMN name DROP NOT NULL'
    );
    
    await queryRunner.query(
      'ALTER TABLE institute ALTER COLUMN country DROP NOT NULL'
    );
    
    // Remove unique constraint
    await queryRunner.query(
      'ALTER TABLE institute DROP CONSTRAINT IF EXISTS UQ_institute_name'
    );
  }
} 