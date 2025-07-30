import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class RecreateTablesWithSnakeCaseColumns1700000000016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop all existing tables in reverse order (due to foreign key constraints)
    await queryRunner.dropTable('task_assignment', true);
    await queryRunner.dropTable('task', true);
    await queryRunner.dropTable('worker', true);
    await queryRunner.dropTable('client', true);
    await queryRunner.dropTable('institute', true);
    await queryRunner.dropTable('user', true);

    // Create user table
    await queryRunner.createTable(
      new Table({
        name: 'user',
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
            length: '100',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'username',
            type: 'varchar',
            length: '50',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'varchar',
            length: '20',
            default: "'VIEWER'",
            isNullable: false,
          },
          {
            name: 'metadata',
            type: 'json',
            isNullable: true,
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

    // Create institute table
    await queryRunner.createTable(
      new Table({
        name: 'institute',
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
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'country',
            type: 'varchar',
            length: '30',
            isNullable: true,
          },
          {
            name: 'metadata',
            type: 'json',
            isNullable: true,
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

    // Create client table
    await queryRunner.createTable(
      new Table({
        name: 'client',
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
            length: '50',
            isUnique: true,
          },
          {
            name: 'country',
            type: 'enum',
            enum: ['US', 'PAK', 'INDIA', 'AUS', 'CANADA', 'UK', 'POLAND', 'KUWAIT', 'SAUDIA', 'DUBAI', 'KENYA', 'QATAR'],
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'currency',
            type: 'enum',
            enum: ['USD', 'PKR', 'INR', 'AUD', 'CAD', 'GBP', 'EUR', 'KWD', 'AED'],
            default: "'AUD'",
            isNullable: true,
          },
          {
            name: 'institute_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'metadata',
            type: 'json',
            isNullable: true,
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

    // Create worker table
    await queryRunner.createTable(
      new Table({
        name: 'worker',
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
            length: '50',
            isUnique: true,
          },
          {
            name: 'country',
            type: 'enum',
            enum: ['US', 'PAK', 'INDIA', 'AUS', 'CANADA', 'UK', 'POLAND', 'KUWAIT', 'SAUDIA', 'DUBAI', 'KENYA', 'QATAR'],
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'currency',
            type: 'enum',
            enum: ['USD', 'PKR', 'INR', 'AUD', 'CAD', 'GBP', 'EUR', 'KWD', 'AED'],
            default: "'AUD'",
            isNullable: true,
          },
          {
            name: 'institute_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'metadata',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'specialties',
            type: 'text',
            isNullable: true,
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

    // Create task table
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
            name: 'metadata',
            type: 'json',
            isNullable: true,
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

    // Create task_assignment table
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
            name: 'metadata',
            type: 'json',
            isNullable: true,
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

    // Create foreign keys
    await queryRunner.createForeignKey(
      'client',
      new TableForeignKey({
        columnNames: ['institute_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'institute',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'worker',
      new TableForeignKey({
        columnNames: ['institute_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'institute',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'task',
      new TableForeignKey({
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'client',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'task_assignment',
      new TableForeignKey({
        columnNames: ['task_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'task',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'task_assignment',
      new TableForeignKey({
        columnNames: ['worker_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'worker',
        onDelete: 'CASCADE',
      }),
    );

    // Create indexes
    await queryRunner.query('CREATE INDEX idx_institute_name ON institute(name)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop all tables in reverse order
    await queryRunner.dropTable('task_assignment', true);
    await queryRunner.dropTable('task', true);
    await queryRunner.dropTable('worker', true);
    await queryRunner.dropTable('client', true);
    await queryRunner.dropTable('institute', true);
    await queryRunner.dropTable('user', true);
  }
} 