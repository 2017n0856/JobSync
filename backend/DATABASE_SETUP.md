# Database Setup Guide

This guide will help you set up the database locally for the JobSync backend project.

## Prerequisites

1. **PostgreSQL** installed on your machine
2. **Node.js** and **npm** installed
3. **Environment variables** configured (see `.env` file)

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=jobsync
PORT=3000
```

## Quick Setup Options

### Option 1: Basic Setup (Tables Only)
```bash
cd backend
npm install
npm run db:setup
```

### Option 2: Setup with Sample Data (Recommended for Development)
```bash
cd backend
npm install
npm run db:setup-with-data
```

This will:
1. Create the database if it doesn't exist
2. Run all migrations to create tables
3. Add sample data to all tables
4. Set up the complete schema with realistic data

## Manual Setup Steps

If you prefer to do it step by step:

### 1. Create the Database

Connect to PostgreSQL and create the database:

```sql
CREATE DATABASE jobsync;
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Run Database Migrations

```bash
# Run the initial migration to create all tables
npm run migration:run

# Optionally add sample data
npm run migration:run -- --name SampleData1700000000001
```

### 4. Verify Setup

Start the application:

```bash
npm run start:dev
```

The application should now connect to the database successfully.

## Migration Commands

- **Setup database and run migrations**: `npm run db:setup`
- **Setup with sample data**: `npm run db:setup-with-data`
- **Generate a new migration**: `npm run migration:generate -- src/migrations/MigrationName`
- **Run migrations**: `npm run migration:run`
- **Revert last migration**: `npm run migration:revert`

## Sample Data Included

The sample data migration includes:

### Institutes
- FAST, NUST, LUMS, PUCIT (Pakistan)
- MIT, Stanford University (US)

### Clients
- Ahmed Khan (Pakistan)
- Sarah Johnson (US)
- Fatima Ali (Pakistan)
- Michael Brown (US)

### Workers
- Ali Hassan, Ayesha Malik, Zara Ahmed (Pakistan)
- David Wilson, John Smith (US)

### Tasks
- Web Development Assignment (delivered)
- Database Design Quiz (delivered)
- Machine Learning Project (in progress)
- Mobile App Development (unassigned)
- Data Structures Exam (delivered)
- UI/UX Design Assignment (delivered)

### Task Assignments
- Various assignments linking workers to tasks with budgets and payments

## Database Schema

The migration creates the following tables:

- **Institute**: Educational institutions
- **Person**: Base table for Client and Worker entities
- **Client**: Clients who create tasks
- **Worker**: Workers who complete tasks
- **Task**: Tasks with status, type, and payment information
- **TaskAssignment**: Many-to-many relationship between tasks and workers

## Troubleshooting

### Database Connection Issues

1. Ensure PostgreSQL is running
2. Verify database credentials in `.env`
3. Check if the database exists: `\l` in psql

### Migration Issues

1. If migrations fail, check the database connection
2. Ensure the database exists before running migrations
3. If you need to reset, drop and recreate the database

### Reset Database

```sql
DROP DATABASE IF EXISTS jobsync;
CREATE DATABASE jobsync;
```

Then run: `npm run migration:run`

### Automated Reset

You can also use the setup script to recreate everything:

```bash
# Basic reset
npm run db:setup

# Reset with sample data
npm run db:setup-with-data
``` 