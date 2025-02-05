import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class GlobalExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    this.logger.error(`${exception.message}`, exception.stack);
  }
}
