import { randomUUID } from 'crypto';
import { RegistrarUsuarioDTO } from '../../auth/dto/registrar.usuario.dto';

import { Roles } from '../../enum/roles.enum';
import { Usuario } from '../entities/usuarios.entity';

export class UsuariosMapper {
  static toEntity(dto: RegistrarUsuarioDTO, password_hash: string): Usuario {
    return {
      id: randomUUID(),
      username: dto.username,
      password_hash,
      rol: Roles.USUARIO,
      active: true,
    };
  }
}
