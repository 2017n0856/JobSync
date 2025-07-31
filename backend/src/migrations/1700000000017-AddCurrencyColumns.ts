import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCurrencyColumns1700000000017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if currency column exists in client table
    const clientTable = await queryRunner.getTable('client');
    const hasClientCurrencyColumn = clientTable?.findColumnByName('currency');
    
    if (!hasClientCurrencyColumn) {
      await queryRunner.addColumn(
        'client',
        new TableColumn({
          name: 'currency',
          type: 'enum',
          enum: ['USD', 'PKR', 'INR', 'AUD', 'CAD', 'GBP', 'EUR', 'KWD', 'AED'],
          default: "'AUD'",
          isNullable: true,
        }),
      );
      console.log('Added currency column to client table');
    } else {
      console.log('Currency column already exists in client table');
    }

    // Check if currency column exists in worker table
    const workerTable = await queryRunner.getTable('worker');
    const hasWorkerCurrencyColumn = workerTable?.findColumnByName('currency');
    
    if (!hasWorkerCurrencyColumn) {
      await queryRunner.addColumn(
        'worker',
        new TableColumn({
          name: 'currency',
          type: 'enum',
          enum: ['USD', 'PKR', 'INR', 'AUD', 'CAD', 'GBP', 'EUR', 'KWD', 'AED'],
          default: "'AUD'",
          isNullable: true,
        }),
      );
      console.log('Added currency column to worker table');
    } else {
      console.log('Currency column already exists in worker table');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove currency columns if they exist
    const clientTable = await queryRunner.getTable('client');
    const hasClientCurrencyColumn = clientTable?.findColumnByName('currency');
    
    if (hasClientCurrencyColumn) {
      await queryRunner.dropColumn('client', 'currency');
    }

    const workerTable = await queryRunner.getTable('worker');
    const hasWorkerCurrencyColumn = workerTable?.findColumnByName('currency');
    
    if (hasWorkerCurrencyColumn) {
      await queryRunner.dropColumn('worker', 'currency');
    }
  }
} 