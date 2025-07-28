import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddMetadataToAllEntities1700000000013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add metadata to user table
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'metadata',
        type: 'json',
        isNullable: true,
      }),
    );

    // Add metadata to institute table
    await queryRunner.addColumn(
      'institute',
      new TableColumn({
        name: 'metadata',
        type: 'json',
        isNullable: true,
      }),
    );

    // Add metadata to tasks table
    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'metadata',
        type: 'json',
        isNullable: true,
      }),
    );

    // Add metadata to task_assignments table
    await queryRunner.addColumn(
      'task_assignments',
      new TableColumn({
        name: 'metadata',
        type: 'json',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove metadata from task_assignments table
    await queryRunner.dropColumn('task_assignments', 'metadata');

    // Remove metadata from tasks table
    await queryRunner.dropColumn('tasks', 'metadata');

    // Remove metadata from institute table
    await queryRunner.dropColumn('institute', 'metadata');

    // Remove metadata from user table
    await queryRunner.dropColumn('user', 'metadata');
  }
} 