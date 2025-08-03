import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableForeignKey,
} from 'typeorm';

export class CreateAllTablesWithSampleData1700000000000
  implements MigrationInterface
{
  name = 'CreateAllTablesWithSampleData1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop existing tables if they exist (in reverse order due to foreign key constraints)
    await queryRunner.query('DROP TABLE IF EXISTS "task" CASCADE');
    await queryRunner.query('DROP TABLE IF EXISTS "worker" CASCADE');
    await queryRunner.query('DROP TABLE IF EXISTS "client" CASCADE');
    await queryRunner.query('DROP TABLE IF EXISTS "institute" CASCADE');
    await queryRunner.query('DROP TABLE IF EXISTS "user" CASCADE');

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
            default: "'viewer'",
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
            enum: [
              'United States',
              'Pakistan',
              'India',
              'Australia',
              'Canada',
              'United Kingdom',
              'Poland',
              'Kuwait',
              'Saudi Arabia',
              'United Arab Emirates',
              'Kenya',
              'Qatar',
            ],
            isNullable: true,
            default: "'Australia'",
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
            enum: ['United States', 'Pakistan', 'India', 'Australia', 'Canada', 'United Kingdom', 'Poland', 'Kuwait', 'Saudi Arabia', 'United Arab Emirates', 'Kenya', 'Qatar'],
            isNullable: true,
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
            default: "'PKR'",
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
            default: "'11:59:59'",
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
            name: 'client_payment_decided',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: 'client_payment_made',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: 'worker_payment_decided',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: 'worker_payment_made',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: 'client_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'worker_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'task_type',
            type: 'enum',
            enum: ['Online Test', 'Quiz', 'Midterm Exam', 'Final Exam', 'Assignment', 'Individual Assignment', 'Group Assignment', 'Project', 'Slides', 'Assessment', 'Final Assignment', 'Tutorial', 'Practice', 'Homework', 'Test', 'Presentation', 'Script', 'Tutorial Assignment', 'Summary', 'Drawing', 'Coding', 'Design', 'Exam', 'Other'],
            default: "'Assignment'",
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
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'task',
      new TableForeignKey({
        columnNames: ['worker_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'worker',
        onDelete: 'SET NULL',
      }),
    );

    // Create indexes
    await queryRunner.createIndex('institute', new TableIndex({
      name: 'idx_institute_name',
      columnNames: ['name'],
    }));

    await queryRunner.createIndex('client', new TableIndex({
      name: 'idx_client_name',
      columnNames: ['name'],
    }));

    await queryRunner.createIndex('worker', new TableIndex({
      name: 'idx_worker_name',
      columnNames: ['name'],
    }));

    // Insert sample data for institutes
    await queryRunner.query(`
      INSERT INTO institute (name, country, metadata) VALUES
      ('University of Sydney', 'Australia', '{"website": "https://sydney.edu.au", "established": 1850}'),
      ('MIT', 'United States', '{"website": "https://mit.edu", "established": 1861}'),
      ('Oxford University', 'United Kingdom', '{"website": "https://ox.ac.uk", "established": 1096}'),
      ('National University of Singapore', 'Singapore', '{"website": "https://nus.edu.sg", "established": 1905}')
    `);

    // Insert sample data for clients
    await queryRunner.query(`
      INSERT INTO client (name, country, phone_number, email, currency, institute_id, metadata) VALUES
      ('John Smith', 'Australia', '+61-412-345-678', 'john.smith@email.com', 'AUD', 1, '{"preferred_contact": "email", "timezone": "Australia/Sydney"}'),
      ('Sarah Johnson', 'United States', '+1-555-123-4567', 'sarah.j@company.com', 'USD', 2, '{"preferred_contact": "phone", "timezone": "America/New_York"}'),
      ('Michael Brown', 'United Kingdom', '+44-20-7946-0958', 'michael.brown@uk.edu', 'GBP', 3, '{"preferred_contact": "email", "timezone": "Europe/London"}'),
      ('Emma Wilson', 'Canada', '+1-416-555-0123', 'emma.wilson@canada.ca', 'CAD', NULL, '{"preferred_contact": "email", "timezone": "America/Toronto"}')
    `);

    // Insert sample data for workers
    await queryRunner.query(`
      INSERT INTO worker (name, country, phone_number, email, currency, institute_id, specialties, metadata) VALUES
      ('Ahmed Hassan', 'Pakistan', '+92-300-123-4567', 'ahmed.hassan@freelancer.com', 'PKR', 1, 'RESEARCH,WRITING,EDITING', '{"experience_years": 5, "rating": 4.8}'),
      ('Priya Patel', 'India', '+91-987-654-3210', 'priya.patel@work.com', 'INR', 2, 'TRANSLATION,DESIGN,DEVELOPMENT', '{"experience_years": 3, "rating": 4.6}'),
      ('David Chen', 'Australia', '+61-400-987-654', 'david.chen@expert.com', 'AUD', 3, 'ANALYSIS,CONSULTATION,RESEARCH', '{"experience_years": 7, "rating": 4.9}'),
      ('Maria Garcia', 'United States', '+34-600-123-456', 'maria.garcia@pro.com', 'EUR', NULL, 'DESIGN,DEVELOPMENT,ANALYSIS', '{"experience_years": 4, "rating": 4.7}')
    `);

    // Insert sample data for tasks
    await queryRunner.query(`
      INSERT INTO task (name, description, deadline_time, deadline_date, submitted_on_date, client_payment_decided, client_payment_made, worker_payment_decided, worker_payment_made, client_id, worker_id, task_type, metadata) VALUES
      ('Research Paper on AI Ethics', 'Comprehensive research paper on ethical implications of artificial intelligence in modern society', '23:59:59', '2024-02-15', '2024-02-14', 500.00, 500.00, 350.00, 350.00, 1, 1, 'Assignment', '{"pages": 15, "citations_required": 20, "academic_level": "Graduate"}'),
      ('Website Design for Startup', 'Modern responsive website design for a tech startup company', '17:00:00', '2024-02-20', '2024-02-19', 1200.00, 1200.00, 800.00, 800.00, 2, 4, 'Project', '{"pages": 8, "responsive": true, "cms_required": true}'),
      ('Translation of Legal Documents', 'Translation of legal contracts from English to Spanish', '18:30:00', '2024-02-10', '2024-02-09', 300.00, 300.00, 200.00, 200.00, 3, 2, 'Other', '{"word_count": 5000, "certified": true, "deadline_critical": true}'),
      ('Data Analysis Report', 'Statistical analysis and report generation for market research data', '16:00:00', '2024-02-25', NULL, 800.00, 0.00, 600.00, 0.00, 4, 3, 'Other', '{"dataset_size": "10MB", "analysis_type": "regression", "visualizations_required": true}')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order (due to foreign key constraints)
    await queryRunner.dropTable('task', true);
    await queryRunner.dropTable('worker', true);
    await queryRunner.dropTable('client', true);
    await queryRunner.dropTable('institute', true);
    await queryRunner.dropTable('user', true);
  }
} 