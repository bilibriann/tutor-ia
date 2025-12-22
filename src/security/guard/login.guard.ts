import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from '../../auth/auth.service';

interface LoginBody {
  username: string;
  password: string;
}

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const body = request.body as LoginBody;
    const usuario = this.authService.validarCredenciales(
      body.username,
      body.password,
    );

    request.usuario = usuario; // ✅ tipado por express.d.ts
    return true;
  }
}
