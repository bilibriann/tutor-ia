import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from '../../auth/interface/jwt_payload.interface';

@Injectable()
export class AutenticacionGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('Falta Authorization');

    const [tipo, token] = authHeader.split(' ');
    if (tipo !== 'Bearer' || !token)
      throw new UnauthorizedException('Token inválido');

    try {
      const payload = await this.jwtService.verifyAsync<JWTPayload>(token, {
        secret: process.env.JWT_SECRET ?? 'secret_dev',
      });

      request['usuario_payload'] = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
