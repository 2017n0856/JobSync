# User Module

This module implements a user management system following Domain-Driven Design (DDD) principles.

## Structure

```
users/
├── domain/
│   ├── entities/
│   │   └── user.entity.ts
│   ├── enums/
│   │   └── role.enum.ts
│   ├── dtos/
│   │   └── update-password.dto.ts
│   └── types/
│       └── user-response.type.ts
├── repositories/
│   └── user.repository.ts
├── services/
│   └── user.service.ts
├── controllers/
│   └── user.controller.ts
├── users.module.ts
└── README.md
```

## Features

### User Entity
- **Required fields**: name, username, password, role
- **Optional fields**: email, phoneNumber
- **Unique constraints**: username, email
- **Role-based access**: user, admin, moderator
- **Audit fields**: createdAt, updatedAt
- **ID**: Auto-incrementing integer (1, 2, 3, ...)

### API Endpoints

#### User Management
- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID
- `GET /user/username/:username` - Get user by username
- `DELETE /user/:id` - Delete user by ID
- `DELETE /user/username/:username` - Delete user by username

#### Password Management
- `PUT /user/:id/password` - Update user password

### Password Update Features
- Validates current password
- Ensures new password is different from current
- Securely hashes passwords using bcrypt
- Returns success/error messages

## Database Migration

The migration includes:
- User table with all required fields
- Role enum type
- Unique indexes on username and email
- Auto-incrementing integer ID
- Proper constraints and defaults
- Existence checks to prevent errors

### Running Migrations

```bash
# Run migrations
npm run migration:run

# Generate new migration
npm run migration:generate src/migrations/MigrationName

# Revert last migration
npm run migration:revert
```

## Validation

### Update Password DTO
- Current password: Required
- New password: 8-255 characters, must be different

## Security Features

- Password hashing with bcrypt (salt rounds: 10)
- Input validation and sanitization
- Unique constraint enforcement
- Proper error handling
- Audit trail with timestamps

## Usage Examples

### Update Password
```json
PUT /user/:id/password
{
  "currentPassword": "CurrentPassword123!",
  "newPassword": "NewSecurePassword123!"
}
```

## Error Handling

- 400: Bad Request (validation errors)
- 404: Not Found (user not found)
- 409: Conflict (username/email already exists)
- 500: Internal Server Error

## Dependencies

- `@nestjs/common` - Core NestJS functionality
- `@nestjs/typeorm` - Database ORM
- `@nestjs/swagger` - API documentation
- `class-validator` - Input validation
- `bcrypt` - Password hashing
- `class-transformer` - DTO transformation 