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

    // Check if metadata column already exists in tasks table
    const tasksTableExists = await queryRunner.hasTable('tasks');
    if (tasksTableExists) {
      const tasksMetadataExists = await queryRunner.hasColumn('tasks', 'metadata');
      if (!tasksMetadataExists) {
        await queryRunner.addColumn(
          'tasks',
          new TableColumn({
            name: 'metadata',
            type: 'json',
            isNullable: true,
          }),
        );
      }
    }

    // Check if metadata column already exists in task_assignments table
    const taskAssignmentsTableExists = await queryRunner.hasTable('task_assignments');
    if (taskAssignmentsTableExists) {
      const taskAssignmentsMetadataExists = await queryRunner.hasColumn('task_assignments', 'metadata');
      if (!taskAssignmentsMetadataExists) {
        await queryRunner.addColumn(
          'task_assignments',
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
    // Remove metadata from task_assignments table
    const taskAssignmentsTableExists = await queryRunner.hasTable('task_assignments');
    if (taskAssignmentsTableExists) {
      const taskAssignmentsMetadataExists = await queryRunner.hasColumn('task_assignments', 'metadata');
      if (taskAssignmentsMetadataExists) {
        await queryRunner.dropColumn('task_assignments', 'metadata');
      }
    }

    // Remove metadata from tasks table
    const tasksTableExists = await queryRunner.hasTable('tasks');
    if (tasksTableExists) {
      const tasksMetadataExists = await queryRunner.hasColumn('tasks', 'metadata');
      if (tasksMetadataExists) {
        await queryRunner.dropColumn('tasks', 'metadata');
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