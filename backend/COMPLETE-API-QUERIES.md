# 🚀 Complete GraphQL API Queries & Mutations

## 📋 Available Operations for All Entities

### 🔹 Client Operations

#### **Get All Clients**
```graphql
query GetAllClients {
  getClients {
    id
    name
    email
    country
    phone_number
    currency
    tasks {
      id
      name
      status
      type
    }
  }
}
```

#### **Get Client By ID**
```graphql
query GetClientById($id: Int!) {
  getClientById(id: $id) {
    id
    name
    email
    country
    phone_number
    currency
    tasks {
      id
      name
      description
      status
      type
      deadline
    }
  }
}
```

#### **Get Client By Name**
```graphql
query GetClientByName($name: String!) {
  getClientByName(name: $name) {
    id
    name
    email
    country
    phone_number
    currency
    tasks {
      id
      name
      status
    }
  }
}
```

#### **Create New Client**
```graphql
mutation CreateClient($createClientData: CreatePersonInput!) {
  addClient(createClientData: $createClientData) {
    id
    name
    email
    country
    phone_number
    currency
  }
}
```

#### **Update Client**
```graphql
mutation UpdateClient($id: Int!, $updateData: CreatePersonInput!) {
  updateClient(id: $id, updateData: $updateData) {
    id
    name
    email
    country
    phone_number
    currency
  }
}
```

#### **Delete Client**
```graphql
mutation DeleteClient($id: Int!) {
  deleteClient(id: $id)
}
```

---

### 🔹 Institute Operations

#### **Get All Institutes**
```graphql
query GetAllInstitutes {
  getInstitutes {
    id
    name
    country
  }
}
```

#### **Get Institute By ID**
```graphql
query GetInstituteById($id: Int!) {
  getInstituteById(id: $id) {
    id
    name
    country
  }
}
```

#### **Get Institute By Name**
```graphql
query GetInstituteByName($name: String!) {
  getInstituteByName(name: $name) {
    id
    name
    country
  }
}
```

#### **Create New Institute**
```graphql
mutation CreateInstitute($createInstituteData: CreateInstituteInput!) {
  addInstitute(createInstituteData: $createInstituteData) {
    id
    name
    country
  }
}
```

#### **Update Institute**
```graphql
mutation UpdateInstitute($id: Int!, $updateData: CreateInstituteInput!) {
  updateInstitute(id: $id, updateData: $updateData) {
    id
    name
    country
  }
}
```

#### **Delete Institute**
```graphql
mutation DeleteInstitute($id: Int!) {
  deleteInstitute(id: $id)
}
```

---

### 🔹 Task Operations

#### **Get All Tasks**
```graphql
query GetAllTasks {
  getTasks {
    id
    name
    description
    status
    type
    payment_decided
    payment_received
    total_marks
    obtained_marks
    deadline
    submitted
    client {
      id
      name
      email
    }
    institute {
      id
      name
      country
    }
    assignments {
      budget_allocated
      payment_made
      worker {
        id
        name
        email
      }
    }
  }
}
```

#### **Get Task By ID**
```graphql
query GetTaskById($id: Int!) {
  getTaskById(id: $id) {
    id
    name
    description
    status
    type
    payment_decided
    payment_received
    total_marks
    obtained_marks
    deadline
    submitted
    client {
      id
      name
      email
    }
    institute {
      id
      name
      country
    }
    assignments {
      budget_allocated
      payment_made
      worker {
        id
        name
        email
      }
    }
  }
}
```

#### **Get Task By Name**
```graphql
query GetTaskByName($name: String!) {
  getTaskByName(name: $name) {
    id
    name
    description
    status
    type
    payment_decided
    payment_received
    deadline
    client {
      id
      name
    }
    institute {
      id
      name
    }
  }
}
```

#### **Create New Task**
```graphql
mutation CreateTask($createTaskData: CreateTaskInput!) {
  addTask(createTaskData: $createTaskData) {
    id
    name
    description
    status
    type
    payment_decided
    payment_received
    deadline
  }
}
```

#### **Update Task**
```graphql
mutation UpdateTask($id: Int!, $updateData: CreateTaskInput!) {
  updateTask(id: $id, updateData: $updateData) {
    id
    name
    description
    status
    type
    payment_decided
    payment_received
    deadline
  }
}
```

#### **Delete Task**
```graphql
mutation DeleteTask($id: Int!) {
  deleteTask(id: $id)
}
```

---

### 🔹 Worker Operations

#### **Get All Workers**
```graphql
query GetAllWorkers {
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
      task {
        id
        name
        status
      }
    }
  }
}
```

#### **Get Worker By ID**
```graphql
query GetWorkerById($id: Int!) {
  getWorkerById(id: $id) {
    id
    name
    email
    country
    phone_number
    currency
    tasks {
      budget_allocated
      payment_made
      task {
        id
        name
        status
        type
      }
    }
  }
}
```

#### **Get Worker By Name**
```graphql
query GetWorkerByName($name: String!) {
  getWorkerByName(name: $name) {
    id
    name
    email
    country
    phone_number
    currency
    tasks {
      budget_allocated
      payment_made
      task {
        id
        name
        status
      }
    }
  }
}
```

#### **Create New Worker**
```graphql
mutation CreateWorker($createWorkerData: CreatePersonInput!) {
  addWorker(createWorkerData: $createWorkerData) {
    id
    name
    email
    country
    phone_number
    currency
  }
}
```

#### **Update Worker**
```graphql
mutation UpdateWorker($id: Int!, $updateData: CreatePersonInput!) {
  updateWorker(id: $id, updateData: $updateData) {
    id
    name
    email
    country
    phone_number
    currency
  }
}
```

#### **Delete Worker**
```graphql
mutation DeleteWorker($id: Int!) {
  deleteWorker(id: $id)
}
```

---

### 🔹 Task Assignment Operations

#### **Get All Task Assignments**
```graphql
query GetAllTaskAssignments {
  getTaskAssignments {
    task_id
    worker_id
    budget_allocated
    payment_made
    task {
      id
      name
      status
      type
    }
    worker {
      id
      name
      email
    }
  }
}
```

#### **Get Task Assignment By ID**
```graphql
query GetTaskAssignmentById($taskId: Int!, $workerId: Int!) {
  getTaskAssignmentById(taskId: $taskId, workerId: $workerId) {
    task_id
    worker_id
    budget_allocated
    payment_made
    task {
      id
      name
      status
      type
    }
    worker {
      id
      name
      email
    }
  }
}
```

#### **Create New Task Assignment**
```graphql
mutation CreateTaskAssignment($createTaskAssignmentData: CreateTaskAssignmentInput!) {
  addTaskAssignment(createTaskAssignmentData: $createTaskAssignmentData) {
    task_id
    worker_id
    budget_allocated
    payment_made
  }
}
```

#### **Update Task Assignment**
```graphql
mutation UpdateTaskAssignment($taskId: Int!, $workerId: Int!, $updateData: CreateTaskAssignmentInput!) {
  updateTaskAssignment(taskId: $taskId, workerId: $workerId, updateData: $updateData) {
    task_id
    worker_id
    budget_allocated
    payment_made
  }
}
```

#### **Delete Task Assignment**
```graphql
mutation DeleteTaskAssignment($taskId: Int!, $workerId: Int!) {
  deleteTaskAssignment(taskId: $taskId, workerId: $workerId)
}
```

---

## 📝 Sample Variables for Mutations

### **Create Client Variables**
```json
{
  "createClientData": {
    "name": "John Doe",
    "email": "john@example.com",
    "country": "US",
    "phone_number": "+1234567890"
  }
}
```

### **Create Institute Variables**
```json
{
  "createInstituteData": {
    "name": "MIT",
    "country": "US"
  }
}
```

### **Create Task Variables**
```json
{
  "createTaskData": {
    "name": "Research Paper",
    "description": "Write a research paper on AI",
    "deadline": "2024-12-31T23:59:59Z",
    "status": "Unassigned",
    "type": "Assignment",
    "payment_decided": 500,
    "client_id": 1,
    "institute_id": 1
  }
}
```

### **Create Worker Variables**
```json
{
  "createWorkerData": {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "country": "US",
    "phone_number": "+1234567891"
  }
}
```

### **Create Task Assignment Variables**
```json
{
  "createTaskAssignmentData": {
    "task_id": 1,
    "worker_id": 1,
    "budget_allocated": 500,
    "payment_made": 0
  }
}
```

---

## 🎯 Quick Test Queries

### **Test All Get Operations**
```graphql
query TestAllGetOperations {
  # Get all clients
  clients: getClients {
    id
    name
    email
  }
  
  # Get all institutes
  institutes: getInstitutes {
    id
    name
    country
  }
  
  # Get all tasks
  tasks: getTasks {
    id
    name
    status
  }
  
  # Get all workers
  workers: getWorkers {
    id
    name
    email
  }
  
  # Get all task assignments
  assignments: getTaskAssignments {
    task_id
    worker_id
    budget_allocated
  }
}
```

### **Test All Create Operations**
```graphql
mutation TestAllCreateOperations {
  # Create client
  client: addClient(createClientData: {
    name: "Test Client"
    email: "test@example.com"
    country: "US"
    phone_number: "+1234567890"
  }) {
    id
    name
  }
  
  # Create institute
  institute: addInstitute(createInstituteData: {
    name: "Test University"
    country: "US"
  }) {
    id
    name
  }
  
  # Create worker
  worker: addWorker(createWorkerData: {
    name: "Test Worker"
    email: "worker@example.com"
    country: "US"
    phone_number: "+1234567891"
  }) {
    id
    name
  }
}
```

---

## 🚀 How to Use

1. **Start the server:**
   ```bash
   npm run start:dev
   ```

2. **Open GraphQL Playground:**
   - Go to: http://localhost:3000/graphql

3. **Test the queries:**
   - Copy any query above
   - Paste it in the left panel
   - Add variables in the bottom panel
   - Click the play button

4. **Check results:**
   - View the response in the right panel
   - Check server logs for additional information

---

## 📊 Available Operations Summary

| Entity | GetAll | GetById | GetByName | Create | Update | Delete |
|--------|--------|---------|-----------|--------|--------|--------|
| Client | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Institute | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Task | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Worker | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| TaskAssignment | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |

**Note:** TaskAssignment doesn't have GetByName because it uses composite primary key (task_id + worker_id).

---

## 🎉 All Operations Complete!

Your GraphQL API now supports:
- ✅ **Get All** operations for all entities
- ✅ **Get By ID** operations for all entities  
- ✅ **Get By Name** operations for entities with unique names
- ✅ **Create** operations for all entities
- ✅ **Update** operations for all entities
- ✅ **Delete** operations for all entities
- ✅ **Relationships** between entities
- ✅ **Error handling** for all operations

**Happy coding! 🚀** 