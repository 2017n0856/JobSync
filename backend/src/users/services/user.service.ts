import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UpdatePasswordDto } from '../domain/dtos/update-password.dto';
import { User } from '../domain/entities/user.entity';
import { UserResponseType } from '../domain/types/user-response.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAllUsers(): Promise<UserResponseType[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => this.mapToResponseType(user));
  }

  async findUserById(id: number): Promise<UserResponseType> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.mapToResponseType(user);
  }

  async findUserByUsername(username: string): Promise<UserResponseType> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.mapToResponseType(user);
  }

  async updatePassword(
    userId: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      updatePasswordDto.currentPassword,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Check if new password is different from current password
    const isNewPasswordSame = await bcrypt.compare(
      updatePasswordDto.newPassword,
      user.password,
    );
    if (isNewPasswordSame) {
      throw new BadRequestException(
        'New password must be different from current password',
      );
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(
      updatePasswordDto.newPassword,
      10,
    );

    // Update password
    await this.userRepository.update(userId, { password: hashedNewPassword });

    return { message: 'Password updated successfully' };
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Failed to delete user');
    }

    return { message: 'User deleted successfully' };
  }

  async deleteUserByUsername(username: string): Promise<{ message: string }> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const deleted = await this.userRepository.delete(user.id);
    if (!deleted) {
      throw new NotFoundException('Failed to delete user');
    }

    return { message: 'User deleted successfully' };
  }

  private mapToResponseType(user: User): UserResponseType {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      username: user.username,
      role: user.role,
      metadata: user.metadata,
    };
  }
}
