import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
  log(message: string) {
    // Filter out route mapping logs but keep module initialization
    if (
      message.includes('Nest application successfully started') ||
      message.includes('dependencies initialized') ||
      message.includes('Starting Nest application') ||
      message.includes('AppModule dependencies initialized') ||
      message.includes('TypeOrmModule dependencies initialized') ||
      message.includes('AuthModule dependencies initialized') ||
      message.includes('InstitutesModule dependencies initialized') ||
      message.includes('UsersModule dependencies initialized') ||
      message.includes('JwtModule dependencies initialized') ||
      message.includes('ConfigModule dependencies initialized') ||
      message.includes('CacheModule dependencies initialized')
    ) {
      // Use process.stdout.write to preserve original formatting
      process.stdout.write(message + '\n');
    }
  }

  error(message: string, trace?: string) {
    // Preserve error formatting with colors
    process.stderr.write(message + '\n');
    if (trace) {
      process.stderr.write(trace + '\n');
    }
  }

  warn(message: string) {
    // Preserve warning formatting with colors
    process.stdout.write(message + '\n');
  }

  debug(message: string) {
    // Suppress debug messages
  }

  verbose(message: string) {
    // Suppress verbose messages
  }
} 