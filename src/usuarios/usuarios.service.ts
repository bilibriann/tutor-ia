import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Usuario } from './entities/usuarios.entity';
import { RegistrarUsuarioDTO } from '../auth/dto/registrar.usuario.dto';
import { UsuariosMapper } from './mapper/usuario.mapper';
import { Roles } from 'src/enum/rol.enum';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [
    {
      id: 'demo-1',
      username: 'admin',
      passwordHash: '21232f297a57a5a743894a0e4a801fc3', // md5("admin")
      rol: Roles.ADMIN,
      active: true,
    },
  ];

  listar() {
    return this.usuarios.map((u) => ({
      id: u.id,
      username: u.username,
      rol: u.rol,
      active: u.active,
    }));
  }

  buscarPorId(id: string) {
    const u = this.usuarios.find((x) => x.id === id);
    if (!u) throw new NotFoundException('Usuario no existe');
    return u;
  }

  buscarPorUsername(username: string) {
    return this.usuarios.find((x) => x.username === username);
  }

  insertarUsuario(dto: RegistrarUsuarioDTO, passwordHash: string) {
    const existe = this.buscarPorUsername(dto.username);
    if (existe) throw new ConflictException('Username ya existe');

    const usuario = UsuariosMapper.toEntity(dto, passwordHash);
    this.usuarios.push(usuario);

    return {
      id: usuario.id,
      username: usuario.username,
      rol: usuario.rol,
      active: usuario.active,
    };
  }
}
