import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import type { StringValue } from 'ms';
import { UsuariosService } from '../usuarios/usuarios.service';
import type { Usuario } from '../usuarios/entities/usuarios.entity';
import type { JWTPayload } from './interface/jwt_payload.interface';
import { GetAccessTokenDTO } from './dto/get.access_token.dto';
import { RegistrarUsuarioDTO } from './dto/registrar.usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  validarCredenciales(username: string, password: string): Usuario {
    const usuario = this.usuariosService.buscarPorUsername(username);

    if (!usuario || usuario.active === false) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordHash = this.generarPasswordHash(password);

    if (passwordHash !== usuario.passwordHash) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return usuario;
  }

  async login(usuario: Usuario): Promise<GetAccessTokenDTO> {
    const payload: JWTPayload = {
      sub: usuario.id,
      user: usuario.username,
      rol: usuario.rol,
    };

    const secret = process.env.JWT_SECRET ?? 'secret_dev';
    const expiresIn = this.parseExpiresIn(process.env.JWT_EXPIRES_IN);

    const access_token = await this.jwtService.signAsync(payload, {
      secret,
      ...(expiresIn ? { expiresIn } : {}),
    });

    return { access_token };
  }

  register(dto: RegistrarUsuarioDTO) {
    const passwordHash = this.generarPasswordHash(dto.password);
    return this.usuariosService.insertarUsuario(dto, passwordHash);
  }

  private generarPasswordHash(password: string): string {
    return createHash('md5').update(password).digest('hex');
  }

  private parseExpiresIn(value?: string): number | StringValue | undefined {
    if (!value) return undefined;

    const asNumber = Number(value);
    if (!Number.isNaN(asNumber)) return asNumber;

    return value as StringValue;
  }
}
