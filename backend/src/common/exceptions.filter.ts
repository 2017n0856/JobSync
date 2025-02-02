import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof QueryFailedError) {
      status = HttpStatus.CONFLICT;
      message = 'Database conflict occurred';
    } else if (exception instanceof Error) {
      message = exception.message;
    }
    console.error('Error:', exception);

    const errorResponse = {
      errors: [
        {
          message,
          extensions: {
            code: status,
          },
        },
      ],
      data: null,
    };

    throw new HttpException(errorResponse, status);
  }
}