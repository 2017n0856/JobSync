import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateTasksTable1700000000010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'deadline_time',
            type: 'time',
            isNullable: true,
          },
          {
            name: 'deadline_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'submitted_on_date',
            type: 'date',
            isNullable: true,
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
            name: 'client_id',
            type: 'int',
          },
          {
            name: 'task_type',
            type: 'enum',
            enum: ['RESEARCH', 'WRITING', 'EDITING', 'TRANSLATION', 'DESIGN', 'DEVELOPMENT', 'ANALYSIS', 'CONSULTATION', 'OTHER'],
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

    // Check if foreign key already exists before creating it
    const foreignKeys = await queryRunner.getTable('task');
    const hasForeignKey = foreignKeys?.foreignKeys?.some(fk => 
      fk.columnNames.includes('client_id') && fk.referencedTableName === 'client'
    );

    if (!hasForeignKey) {
      // Create foreign key for client
      await queryRunner.createForeignKey(
        'task',
        new TableForeignKey({
          columnNames: ['client_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'client',
          onDelete: 'CASCADE',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task');
  }
} 