import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddSpecialtiesToWorkersTable1700000000012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'workers',
      new TableColumn({
        name: 'specialties',
        type: 'simple-array',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('workers', 'specialties');
  }
} 