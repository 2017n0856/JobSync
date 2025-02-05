import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

@Injectable()
export class GraphQLLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('GraphQL');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlCtx = GqlExecutionContext.create(context);
    const resolverName = gqlCtx.getClass().name;
    const methodName = gqlCtx.getHandler().name;

    const startTime = Date.now();
    this.logger.log(`${resolverName} -> ${methodName} called`);

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        this.logger.log(`${resolverName} -> ${methodName} completed in ${duration}ms`, 'GraphQL');
      })
    );
  }
}
