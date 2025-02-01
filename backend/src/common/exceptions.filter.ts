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
    console.log('here111', exception);
    // Handle specific errors
    if (exception instanceof HttpException) {
      // Handle NestJS HTTP exceptions
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof QueryFailedError) {
      // Handle TypeORM database errors
      status = HttpStatus.CONFLICT;
      message = 'Database conflict occurred';
    } else if (exception instanceof Error) {
      // Handle generic errors
      message = exception.message;
    }

    // Log the error (optional)
    console.error('Error:', exception);

    // Format the error response for GraphQL
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

    // Throw the error so GraphQL can handle it
    throw new HttpException(errorResponse, status);
  }
}