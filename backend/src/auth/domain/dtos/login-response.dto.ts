import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiam9obmRvZSIsImlhdCI6MTYzNTY4OTYwMCwiZXhwIjoxNjM1Nzc2MDAwfQ.example_signature'
  })
  accessToken: string;

  @ApiProperty({
    description: 'User information',
    example: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      username: 'johndoe',
      role: 'viewer'
    }
  })
  user: {
    id: number;
    name: string;
    email?: string;
    phoneNumber?: string;
    username: string;
    role: string;
  };

  static example(): LoginResponseDto {
    return {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiam9obmRvZSIsImlhdCI6MTYzNTY4OTYwMCwiZXhwIjoxNjM1Nzc2MDAwfQ.example_signature',
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
        username: 'johndoe',
        role: 'viewer'
      }
    };
  }
} 