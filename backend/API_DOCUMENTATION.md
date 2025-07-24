# JobSync API Documentation

This project provides both **GraphQL** and **REST** API endpoints for testing and development.

## 🚀 Quick Start

1. **Start the application:**
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Access the documentation:**
   - **Swagger UI**: http://localhost:3000/api-docs
   - **GraphQL Playground**: http://localhost:3000/graphql
   - **Health Check**: http://localhost:3000/health

## 📚 API Endpoints

### REST Endpoints

#### Health Check
- **GET** `/health` - Application health status
- **GET** `/health/graphql-info` - GraphQL endpoint information

### GraphQL Endpoints

#### Queries
```graphql
# Get all clients
query {
  getClients {
    id
    name
    email
    country
    phone_number
    currency
  }
}

# Get all workers
query {
  getWorkers {
    id
    name
    email
    country
    phone_number
    currency
    tasks {
      budget_allocated
      payment_made
    }
  }
}

# Get all tasks
query {
  getTasks {
    id
    name
    description
    payment_decided
    payment_received
    total_marks
    obtained_marks
    deadline
    submitted
    status
    type
    institute {
      id
      name
      country
    }
    assignments {
      budget_allocated
      payment_made
    }
  }
}

# Get all institutes
query {
  getInstitutes {
    id
    name
    country
  }
}

# Get all task assignments
query {
  getTaskAssignments {
    budget_allocated
    payment_made
  }
}
```

#### Mutations
```graphql
# Add a new client
mutation {
  addClient(createClientData: {
    name: "John Doe"
    email: "john.doe@email.com"
    country: "US"
    phone_number: "+1234567890"
  }) {
    id
    name
    email
    country
    phone_number
    currency
  }
}

# Add a new worker
mutation {
  addWorker(createWorkerData: {
    name: "Jane Smith"
    email: "jane.smith@email.com"
    country: "US"
    phone_number: "+1234567891"
  }) {
    id
    name
    email
    country
    phone_number
    currency
  }
}

# Add a new task
mutation {
  addTask(createTaskData: {
    name: "React Development"
    description: "Build a modern React application"
    budget_allocated: 5000
    payment_received: 0
    deadline: "2024-03-01T23:59:59Z"
    status: "unassigned"
    type: "assignment"
    client_id: 1
    institute_id: 1
  }) {
    id
    name
    description
    payment_decided
    payment_received
    status
    type
  }
}

# Add a new institute
mutation {
  addInstitute(createInstituteData: {
    name: "Harvard University"
    country: "US"
  }) {
    id
    name
    country
  }
}

# Add a new task assignment
mutation {
  addTaskAssignment(createTaskAssignmentData: {
    task_id: 1
    worker_id: 1
    budget_allocated: 5000
    payment_made: 0
  }) {
    budget_allocated
    payment_made
  }
}
```

## 🔧 Testing with Swagger

### REST API Testing
1. Open http://localhost:3000/api-docs
2. You'll see the Swagger UI with all REST endpoints
3. Click on any endpoint to expand it
4. Click "Try it out" to test the endpoint
5. Fill in any required parameters
6. Click "Execute" to run the request

### GraphQL Testing
1. Open http://localhost:3000/graphql
2. You'll see the GraphQL Playground
3. Use the queries and mutations above
4. The playground provides:
   - Auto-completion
   - Schema documentation
   - Query validation
   - Real-time results

## 📊 Sample Data Queries

Once you've run the sample data migration, you can test with these queries:

### Get All Data
```graphql
query {
  getClients {
    id
    name
    email
    country
  }
  getWorkers {
    id
    name
    email
    country
  }
  getTasks {
    id
    name
    status
    type
  }
  getInstitutes {
    id
    name
    country
  }
}
```

### Get Tasks by Status
```graphql
query {
  getTasks {
    id
    name
    status
    type
    payment_decided
    payment_received
    deadline
  }
}
```

### Get Workers with Their Tasks
```graphql
query {
  getWorkers {
    id
    name
    email
    country
    tasks {
      budget_allocated
      payment_made
    }
  }
}
```

## 🛠️ Development

### Adding New REST Endpoints
1. Create a new controller in `src/controllers/`
2. Add Swagger decorators (`@ApiTags`, `@ApiOperation`, etc.)
3. Register the controller in `AppModule`

### Adding New GraphQL Resolvers
1. Create a new resolver in `src/resolvers/`
2. Add queries/mutations with proper decorators
3. Register the resolver in the appropriate module

### Testing
- **REST APIs**: Use Swagger UI or tools like Postman
- **GraphQL**: Use the GraphQL Playground
- **Both**: Use curl or any HTTP client

## 🔍 Troubleshooting

### Common Issues
1. **Database not connected**: Run `npm run db:setup-with-data`
2. **GraphQL playground not loading**: Check if the server is running
3. **Swagger not accessible**: Ensure the server started without errors

### Useful Commands
```bash
# Start development server
npm run start:dev

# Setup database with sample data
npm run db:setup-with-data

# Generate new migration
npm run migration:generate -- src/migrations/MigrationName

# Run migrations
npm run migration:run
```

## 📝 Notes

- **GraphQL Playground** is the primary tool for testing GraphQL APIs
- **Swagger UI** is for REST endpoints and API documentation
- Both tools provide interactive testing capabilities
- The GraphQL schema is auto-generated from your resolvers
- Sample data is available after running the setup script 