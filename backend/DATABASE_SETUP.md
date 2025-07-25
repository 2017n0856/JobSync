# Database Setup Guide

This guide will help you set up the database locally for the JobSync backend project.

## Prerequisites

1. **PostgreSQL** installed on your machine
2. **Node.js** and **npm** installed
3. **Environment variables** configured (see `.env` file)

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=jobsync

# Application Configuration
PORT=3000
NODE_ENV=development
```

## Quick Setup

Run this single command to set up everything:

```bash
cd backend
npm install
npm run db:setup
```

This will:
1. ✅ Create the database if it doesn't exist
2. ✅ Create all tables based on your entities
3. ✅ Insert sample data if it doesn't exist
4. ✅ Set up the complete schema with realistic data

## Database Commands

- **Setup database**: `npm run db:setup`
- **Reset database**: `npm run db:reset` (same as setup)

## What Gets Created

### Tables
- **Institute** - Educational institutions
- **Person** - Base table for Client and Worker entities
- **Client** - Clients who create tasks
- **Worker** - Workers who complete tasks
- **Task** - Tasks with status, type, and payment information
- **TaskAssignment** - Many-to-many relationship between tasks and workers

### Sample Data
- **6 Institutes** (FAST, NUST, LUMS, PUCIT, MIT, Stanford)
- **4 Clients** (mix of Pakistan and US)
- **5 Workers** (mix of Pakistan and US)
- **6 Tasks** (various statuses: delivered, in progress, unassigned)
- **5 Task Assignments** (with budgets and payments)

## Testing

After setup, you can test with:

1. **Start the application**:
   ```bash
   npm run start:dev
   ```

2. **Access GraphQL Playground**: http://localhost:3000/graphql

3. **Test queries**:
   ```graphql
   query {
     getInstitutes {
       id
       name
       country
     }
   }
   ```

## Troubleshooting

### Database Connection Issues
1. Ensure PostgreSQL is running
2. Verify database credentials in `.env`
3. Check if the database exists: `\l` in psql

### Setup Issues
1. Make sure you're in the `backend` directory
2. Check that `.env` file exists with correct credentials
3. Ensure PostgreSQL is accessible with the provided credentials

### Reset Everything
If you need to start fresh:
```bash
npm run db:reset
```

This will recreate everything from scratch. 