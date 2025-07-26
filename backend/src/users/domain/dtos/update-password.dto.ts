import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'Current password', example: 'CurrentPassword123!' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ description: 'New password', example: 'NewSecurePassword123!' })
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  newPassword: string;
} 