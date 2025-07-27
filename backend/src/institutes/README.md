# Institutes Module

This module handles institute management with name and country information.

## Features

- Create new institutes
- Get institute by ID
- Get all institutes with optional country filtering
- Unique name validation
- Input validation with class-validator

## Endpoints

### POST /institute
Create a new institute.

**Request Body:**
```json
{
  "name": "Harvard University",
  "country": "United States"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Harvard University",
  "country": "United States",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /institute/:id
Get institute by ID.

**Response:**
```json
{
  "id": 1,
  "name": "Harvard University",
  "country": "United States",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /institute
Get all institutes with optional country filter.

**Query Parameters:**
- `country` (optional): Filter institutes by country name (case-insensitive partial match)

**Examples:**
- `GET /institute` - Get all institutes
- `GET /institute?country=United States` - Get institutes in United States
- `GET /institute?country=Canada` - Get institutes in Canada

**Response:**
```json
[
  {
    "id": 1,
    "name": "Harvard University",
    "country": "United States",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "MIT",
    "country": "United States",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### PUT /institute/:id
Update institute by ID.

**Request Body:**
```json
{
  "name": "Harvard University Updated",
  "country": "United States"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Harvard University Updated",
  "country": "United States"
}
```

## Architecture

The institutes module follows the same architecture pattern as other modules:

```
institutes/
├── controllers/
│   └── institute.controller.ts
├── domain/
│   ├── dtos/
│   │   ├── create-institute.dto.ts
│   │   ├── update-institute.dto.ts
│   │   ├── institute-response.dto.ts
│   │   └── get-institutes-query.dto.ts
│   └── entities/
│       └── institute.entity.ts
├── repositories/
│   └── institute.repository.ts
├── services/
│   └── institute.service.ts
└── institutes.module.ts
```

## Validation Rules

- **Name**: Required, 2-255 characters, must be unique
- **Country**: Required, 2-100 characters
- **Country Filter**: Optional, 2-100 characters, case-insensitive partial match

## Error Responses

- **400 Bad Request**: Validation errors
- **404 Not Found**: Institute not found
- **409 Conflict**: Institute with this name already exists

## Database Schema

```sql
CREATE TABLE institute (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  country VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_institute_name ON institute(name);
```

## Usage Examples

**Create Institute:**
```bash
curl -X POST http://localhost:3000/institute \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Stanford University",
    "country": "United States"
  }'
```

**Get Institute by ID:**
```bash
curl -X GET http://localhost:3000/institute/1
```

**Get All Institutes:**
```bash
curl -X GET http://localhost:3000/institute
```

**Filter by Country:**
```bash
curl -X GET "http://localhost:3000/institute?country=United%20States"
```

**Update Institute:**
```bash
curl -X PUT http://localhost:3000/institute/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Harvard University Updated",
    "country": "United States"
  }'
``` 