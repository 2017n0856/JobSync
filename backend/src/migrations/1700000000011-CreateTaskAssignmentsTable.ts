import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateTaskAssignmentsTable1700000000011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task_assignment',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'task_id',
            type: 'int',
          },
          {
            name: 'worker_id',
            type: 'int',
          },
          {
            name: 'payment_decided',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: 'payment_made',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Check if foreign keys already exist before creating them
    const foreignKeys = await queryRunner.getTable('task_assignment');
    const hasTaskForeignKey = foreignKeys?.foreignKeys?.some(fk => 
      fk.columnNames.includes('task_id') && fk.referencedTableName === 'task'
    );
    const hasWorkerForeignKey = foreignKeys?.foreignKeys?.some(fk => 
      fk.columnNames.includes('worker_id') && fk.referencedTableName === 'worker'
    );

    if (!hasTaskForeignKey) {
      // Create foreign key for task
      await queryRunner.createForeignKey(
        'task_assignment',
        new TableForeignKey({
          columnNames: ['task_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'task',
          onDelete: 'CASCADE',
        }),
      );
    }

    if (!hasWorkerForeignKey) {
      // Create foreign key for worker
      await queryRunner.createForeignKey(
        'task_assignment',
        new TableForeignKey({
          columnNames: ['worker_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'worker',
          onDelete: 'CASCADE',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task_assignment');
  }
} 