import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUsersTable1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if enum type exists, if not create it
    const enumExists = await queryRunner.hasTable('pg_enum');
    if (!enumExists) {
      await queryRunner.query(`
        DO $$ BEGIN
          CREATE TYPE "public"."role_enum" AS ENUM('user', 'admin', 'moderator');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `);
    }

    // Check if user table exists
    const tableExists = await queryRunner.hasTable('user');
    if (!tableExists) {
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
            },
            {
              name: 'password',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'role',
              type: 'enum',
              enum: ['user', 'admin', 'moderator'],
              default: "'user'",
              isNullable: false,
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
        true
      );

      // Create indexes
      await queryRunner.createIndex(
        'user',
        new TableIndex({
          name: 'IDX_USER_USERNAME',
          columnNames: ['username'],
          isUnique: true,
        })
      );

      await queryRunner.createIndex(
        'user',
        new TableIndex({
          name: 'IDX_USER_EMAIL',
          columnNames: ['email'],
          isUnique: true,
        })
      );

      await queryRunner.createIndex(
        'user',
        new TableIndex({
          name: 'IDX_USER_ID',
          columnNames: ['id'],
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Check if user table exists before dropping
    const tableExists = await queryRunner.hasTable('user');
    if (tableExists) {
      await queryRunner.dropTable('user');
    }

    // Check if enum type exists before dropping
    const enumExists = await queryRunner.hasTable('pg_enum');
    if (enumExists) {
      await queryRunner.query(`DROP TYPE IF EXISTS "public"."role_enum"`);
    }
  }
} 