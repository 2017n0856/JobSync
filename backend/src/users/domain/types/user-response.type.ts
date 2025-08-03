import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';

export class UserResponseType {
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  name: string;

  @ApiPropertyOptional({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+1234567890',
  })
  phoneNumber?: string;

  @ApiProperty({ description: 'Unique username', example: 'johndoe' })
  username: string;

  @ApiProperty({ description: 'User role', enum: Role, example: Role.VIEWER })
  role: Role;

  @ApiPropertyOptional({
    description: 'Additional metadata as JSON',
    example: { department: 'Engineering', location: 'New York' },
  })
  metadata?: Record<string, any>;

  static example(): UserResponseType {
    return {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      username: 'johndoe',
      role: Role.VIEWER,
      metadata: { department: 'Engineering', location: 'New York' },
    };
  }
}
