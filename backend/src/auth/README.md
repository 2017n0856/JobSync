# Auth Module

This module handles user authentication using JWT tokens.

## Features

- User registration (signup)
- User login with email or username
- JWT token generation
- Password hashing with bcrypt

## Endpoints

### POST /auth/signup
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "+1234567890",
    "username": "johndoe",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST /auth/login
Login with email/username and password.

**Request Body:**
```json
{
  "emailOrUsername": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "+1234567890",
    "username": "johndoe",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Environment Variables

- `JWT_SECRET`: Secret key for JWT token signing
- `JWT_EXPIRES_IN`: JWT token expiration time (default: 24h)

## Architecture

The auth module follows the same architecture pattern as other modules:

```
auth/
├── controllers/
│   └── auth.controller.ts
├── domain/
│   └── dtos/
│       ├── login.dto.ts
│       ├── signup.dto.ts
│       ├── login-response.dto.ts
│       └── signup-response.dto.ts
├── guards/
│   └── jwt-auth.guard.ts
├── strategies/
│   └── jwt.strategy.ts
├── services/
│   └── auth.service.ts
└── auth.module.ts
```

## Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT token generation
- Email/username uniqueness validation
- Input validation with class-validator

## Response DTOs

Each endpoint has a dedicated response DTO with static examples:

- `LoginResponseDto`: Response for login endpoint
- `SignupResponseDto`: Response for signup endpoint

Both DTOs include:
- `accessToken`: JWT token string
- `user`: User information object
- `static example()`: Static method returning example data 