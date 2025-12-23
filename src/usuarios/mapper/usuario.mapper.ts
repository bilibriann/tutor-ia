import { randomUUID } from 'crypto';
import { RegistrarUsuarioDTO } from '../../auth/dto/registrar.usuario.dto';
import { Usuario } from '../entities/usuarios.entity';
import { Roles } from '../../enum/rol.enum';

export class UsuariosMapper {
  static toEntity(dto: RegistrarUsuarioDTO, passwordHash: string): Usuario {
    return {
      id: randomUUID(),
      username: dto.username,
      passwordHash,
      rol: Roles.USUARIO,
      active: true,
    };
  }
}
