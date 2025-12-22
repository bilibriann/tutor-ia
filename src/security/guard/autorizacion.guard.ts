import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { ROLES_AUTORIZADOS_KEY } from '../decorator/roles.decorator';
import type { JWTPayload } from '../../auth/interface/jwt_payload.interface';

@Injectable()
export class AutorizacionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequeridos =
      this.reflector.getAllAndOverride<Array<JWTPayload['rol']>>(
        ROLES_AUTORIZADOS_KEY,
        [context.getHandler(), context.getClass()],
      ) ?? [];

    if (rolesRequeridos.length === 0) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const rol = request.usuarioPayload?.rol;

    if (!rol) throw new ForbiddenException('Sin rol en token');
    if (!rolesRequeridos.includes(rol))
      throw new ForbiddenException('No autorizado');

    return true;
  }
}
