import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddMetadataToExistingTables1700000000014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if metadata column already exists in user table
    const userTableExists = await queryRunner.hasTable('user');
    if (userTableExists) {
      const userMetadataExists = await queryRunner.hasColumn('user', 'metadata');
      if (!userMetadataExists) {
        await queryRunner.addColumn(
          'user',
          new TableColumn({
            name: 'metadata',
            type: 'json',
            isNullable: true,
          }),
        );
      }
    }

    // Check if metadata column already exists in institute table
    const instituteTableExists = await queryRunner.hasTable('institute');
    if (instituteTableExists) {
      const instituteMetadataExists = await queryRunner.hasColumn('institute', 'metadata');
      if (!instituteMetadataExists) {
        await queryRunner.addColumn(
          'institute',
          new TableColumn({
            name: 'metadata',
            type: 'json',
            isNullable: true,
          }),
        );
      }
    }

    // Check if metadata column already exists in task table
    const taskTableExists = await queryRunner.hasTable('task');
    if (taskTableExists) {
      const taskMetadataExists = await queryRunner.hasColumn('task', 'metadata');
      if (!taskMetadataExists) {
        await queryRunner.addColumn(
          'task',
          new TableColumn({
            name: 'metadata',
            type: 'json',
            isNullable: true,
          }),
        );
      }
    }

    // Check if metadata column already exists in task_assignment table
    const taskAssignmentTableExists = await queryRunner.hasTable('task_assignment');
    if (taskAssignmentTableExists) {
      const taskAssignmentMetadataExists = await queryRunner.hasColumn('task_assignment', 'metadata');
      if (!taskAssignmentMetadataExists) {
        await queryRunner.addColumn(
          'task_assignment',
          new TableColumn({
            name: 'metadata',
            type: 'json',
            isNullable: true,
          }),
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove metadata from task_assignment table
    const taskAssignmentTableExists = await queryRunner.hasTable('task_assignment');
    if (taskAssignmentTableExists) {
      const taskAssignmentMetadataExists = await queryRunner.hasColumn('task_assignment', 'metadata');
      if (taskAssignmentMetadataExists) {
        await queryRunner.dropColumn('task_assignment', 'metadata');
      }
    }

    // Remove metadata from task table
    const taskTableExists = await queryRunner.hasTable('task');
    if (taskTableExists) {
      const taskMetadataExists = await queryRunner.hasColumn('task', 'metadata');
      if (taskMetadataExists) {
        await queryRunner.dropColumn('task', 'metadata');
      }
    }

    // Remove metadata from institute table
    const instituteTableExists = await queryRunner.hasTable('institute');
    if (instituteTableExists) {
      const instituteMetadataExists = await queryRunner.hasColumn('institute', 'metadata');
      if (instituteMetadataExists) {
        await queryRunner.dropColumn('institute', 'metadata');
      }
    }

    // Remove metadata from user table
    const userTableExists = await queryRunner.hasTable('user');
    if (userTableExists) {
      const userMetadataExists = await queryRunner.hasColumn('user', 'metadata');
      if (userMetadataExists) {
        await queryRunner.dropColumn('user', 'metadata');
      }
    }
  }
} 