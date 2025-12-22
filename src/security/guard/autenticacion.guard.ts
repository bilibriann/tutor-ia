import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import type { JWTPayload } from '../../auth/interface/jwt_payload.interface';

@Injectable()
export class AutenticacionGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.header('authorization');
    if (!authHeader) throw new UnauthorizedException('Falta Authorization');

    const [tipo, token] = authHeader.split(' ');
    if (tipo !== 'Bearer' || !token) {
      throw new UnauthorizedException('Usa: Bearer <token>');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JWTPayload>(token, {
        secret: process.env.JWT_SECRET ?? 'secret_dev',
      });

      request.usuarioPayload = payload; // ✅ tipado
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
