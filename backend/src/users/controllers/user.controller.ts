import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UpdatePasswordDto } from '../domain/dtos/update-password.dto';
import { UserResponseType } from '../domain/types/user-response.type';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { HttpMethodGuard } from '../../common/guards/http-method.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../domain/enums/role.enum';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard, HttpMethodGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [Object], // Replace with proper response type
  })
  async getAllUsers(): Promise<UserResponseType[]> {
    return await this.userService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: Object, // Replace with proper response type
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseType> {
    return await this.userService.findUserById(id);
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Get user by username' })
  @ApiParam({ name: 'username', description: 'Username' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: Object, // Replace with proper response type
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<UserResponseType> {
    return await this.userService.findUserByUsername(username);
  }

  @Put(':id/password')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Password updated successfully' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Current password is incorrect or new password is same as current',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    return await this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return await this.userService.deleteUser(id);
  }

  @Delete('username/:username')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete user by username' })
  @ApiParam({ name: 'username', description: 'Username' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUserByUsername(
    @Param('username') username: string,
  ): Promise<{ message: string }> {
    return await this.userService.deleteUserByUsername(username);
  }
}
