import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../users/repositories/user.repository';
import { LoginDto } from '../domain/dtos/login.dto';
import { SignupDto } from '../domain/dtos/signup.dto';
import { LoginResponseDto } from '../domain/dtos/login-response.dto';
import { SignupResponseDto } from '../domain/dtos/signup-response.dto';
import { User } from '../../users/domain/entities/user.entity';
import { UserResponseType } from '../../users/domain/types/user-response.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<SignupResponseDto> {
    // Check if user with email already exists
    if (signupDto.email) {
      const existingUserByEmail = await this.userRepository.findByEmail(
        signupDto.email,
      );
      if (existingUserByEmail) {
        throw new ConflictException('User with this email already exists');
      }
    }

    // Check if user with username already exists
    const existingUserByUsername = await this.userRepository.findByUsername(
      signupDto.username,
    );
    if (existingUserByUsername) {
      throw new ConflictException('User with this username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Create user
    const user = await this.userRepository.create({
      name: signupDto.name,
      email: signupDto.email,
      phoneNumber: signupDto.phoneNumber,
      username: signupDto.username,
      password: hashedPassword,
    });

    // Generate JWT token
    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: this.mapToResponseType(user),
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    // Find user by email or username
    let user: User | null = null;

    // Try to find by email first
    if (loginDto.email.includes('@')) {
      user = await this.userRepository.findByEmail(loginDto.email);
    }

    // If not found by email, try by username
    if (!user) {
      user = await this.userRepository.findByUsername(loginDto.email);
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: this.mapToResponseType(user),
    };
  }

  async validateUser(
    emailOrUsername: string,
    password: string,
  ): Promise<User | null> {
    // Find user by email or username
    let user: User | null = null;

    // Try to find by email first
    if (emailOrUsername.includes('@')) {
      user = await this.userRepository.findByEmail(emailOrUsername);
    }

    // If not found by email, try by username
    if (!user) {
      user = await this.userRepository.findByUsername(emailOrUsername);
    }

    if (!user) {
      return null;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  private mapToResponseType(user: User): UserResponseType {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      username: user.username,
      role: user.role,
    };
  }
}
