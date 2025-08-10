import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '../../users/domain/enums/role.enum';

@Injectable()
export class HttpMethodGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user, method } = request;

    if (!user) {
      return false;
    }

    const httpMethod = method.toUpperCase();

    switch (user.role) {
      case Role.ADMIN:
        return true;
      case Role.EDITOR:
        return ['GET', 'PUT', 'PATCH'].includes(httpMethod);
      case Role.VIEWER:
        return httpMethod === 'GET';
      default:
        return false;
    }
  }
} 