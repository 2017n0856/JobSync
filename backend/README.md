# JobSync Backend

A NestJS-based RESTful API with PostgreSQL, Redis, and Docker support.

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **PostgreSQL** - Primary database
- **Redis** - Caching layer
- **Docker** - Containerization
- **Swagger** - API documentation
- **TypeORM** - Database ORM
- **Class Validator** - Request validation

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)
- Redis (if running locally)

## Quick Start

### Using Docker (Recommended)

1. Clone the repository
2. Copy the environment file:
   ```bash
   cp env.example .env
   ```

3. Start all services with Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. The API will be available at:
   - Application: http://localhost:3000
   - Swagger Documentation: http://localhost:3000/docs

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment file:
   ```bash
   cp env.example .env
   ```

3. Update the `.env` file with your database and Redis credentials

4. Start PostgreSQL and Redis services

5. Run the application:
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## Environment Variables

Create a `.env` file based on `env.example`:

```env
# Application Configuration
NODE_ENV=development
PORT=3000

# Database Configuration (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=jobsync

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_TTL=300

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# API Configuration
API_PREFIX=api/v1
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=debug
```

## Available Scripts

- `npm run start:dev` - Start in development mode with hot reload
- `npm run build` - Build the application
- `npm run start:prod` - Start in production mode
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:e2e` - Run end-to-end tests

## API Endpoints

### Swagger Documentation
- `GET /docs` - Interactive API documentation

## Project Structure

```
src/
├── main.ts              # Application entry point
├── app.module.ts        # Root module
└── modules/             # Feature modules (to be added)
```

## Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build -d
```

## Development

This is a basic setup with:
- ✅ NestJS framework
- ✅ PostgreSQL database configuration
- ✅ Redis caching
- ✅ Docker setup
- ✅ Swagger documentation at `/docs`
- ✅ Environment configuration
- ✅ TypeScript support

Ready for you to add your specific business logic and entities!
