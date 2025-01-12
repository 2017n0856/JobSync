// src/filters/graphql-exception.filter.ts
import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Catch()
export class GraphqlExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const status = exception instanceof ApolloError ? exception.extensions.response.statusCode : 500;
    const message = exception instanceof Error ? exception.message : 'Internal server error';

    return {
      status: false,
      message,
      data: null,
    };
  }
}
