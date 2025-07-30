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

    // Add metadata to task table
    await queryRunner.addColumn(
      'task',
      new TableColumn({
        name: 'metadata',
        type: 'json',
        isNullable: true,
      }),
    );

    // Add metadata to task_assignment table
    await queryRunner.addColumn(
      'task_assignment',
      new TableColumn({
        name: 'metadata',
        type: 'json',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove metadata from task_assignment table
    await queryRunner.dropColumn('task_assignment', 'metadata');

    // Remove metadata from task table
    await queryRunner.dropColumn('task', 'metadata');

    // Remove metadata from institute table
    await queryRunner.dropColumn('institute', 'metadata');

    // Remove metadata from user table
    await queryRunner.dropColumn('user', 'metadata');
  }
} 