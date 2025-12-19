import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Crypto from 'crypto';
import { UsuariosService } from '../usuarios/usuarios.services';
import { RegistrarUsuarioDTO } from './dto/registrar.usuario.dto';
import { GetAccessTokenDTO } from './dto/get.access_token.dto';
import { JWTPayload } from './interface/jwt_payload.interface';

@Injectable()
export class AuthService {
  private modo_hash: string = process.env.MODO_HASH ?? 'md5';

  constructor(
    private readonly jwtService: JwtService,
    private readonly usuariosService: UsuariosService,
  ) {}

  registrar(dto: RegistrarUsuarioDTO) {
    const password_hash = this.generarPasswordHash(dto.password);
    return this.usuariosService.insertarUsuario(dto, password_hash);
  }

  async login(usuario: { id: string; username: string; rol: string }) {
    const payload: JWTPayload = {
      sub: usuario.id,
      user: usuario.username,
      rol: usuario.rol,
    };

    const respuesta = new GetAccessTokenDTO();
    respuesta.access_token = await this.jwtService.signAsync(payload);
    return respuesta;
  }

  validarCredenciales(username: string, password: string) {
    const usuario = this.usuariosService.buscarPorUsername(username);
    if (!usuario) throw new UnauthorizedException('Credenciales no válidas');

    const password_hash = this.generarPasswordHash(password);
    if (password_hash !== usuario.password_hash)
      throw new UnauthorizedException('Credenciales no válidas');

    return usuario;
  }

  generarPasswordHash(password: string) {
    return Crypto.createHash(this.modo_hash).update(password).digest('hex');
  }
}
