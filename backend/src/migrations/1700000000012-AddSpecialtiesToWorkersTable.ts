import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddSpecialtiesToWorkersTable1700000000012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'worker',
      new TableColumn({
        name: 'specialties',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('worker', 'specialties');
  }
} 