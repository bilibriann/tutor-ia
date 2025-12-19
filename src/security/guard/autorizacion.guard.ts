import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_AUTORIZADOS_KEY } from '../decorator/roles.decorator';

@Injectable()
export class AutorizacionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequeridos =
      this.reflector.getAllAndOverride<string[]>(ROLES_AUTORIZADOS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [];

    if (rolesRequeridos.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const payload = request['usuario_payload'];

    if (!payload?.rol) throw new ForbiddenException('Sin rol');

    if (!rolesRequeridos.includes(payload.rol)) {
      throw new ForbiddenException('No autorizado');
    }

    return true;
  }
}
