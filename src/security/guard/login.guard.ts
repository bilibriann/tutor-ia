import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { username, password } = request.body;

    const usuario = this.authService.validarCredenciales(username, password);

    // deja el usuario ya validado disponible para el controller
    request.usuario = usuario;
    return true;
  }
}
