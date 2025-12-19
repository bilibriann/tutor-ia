import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Usuario } from './entities/usuarios.entity';
import { RegistrarUsuarioDTO } from '../auth/dto/registrar.usuario.dto';
import { UsuariosMapper } from './mapper/usuario.mapper';
import { Roles } from '../enum/roles.enum';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [
    {
      id: 'demo-1',
      username: 'admin',
      password_hash: '21232f297a57a5a743894a0e4a801fc3', // md5("admin")
      rol: Roles.ADMIN,
      active: true,
    },
  ];

  listar() {
    return this.usuarios.map(({ password_hash, ...u }) => u);
  }

  buscarPorId(id: string) {
    const u = this.usuarios.find((x) => x.id === id);
    if (!u) throw new NotFoundException('Usuario no existe');
    return u;
  }

  buscarPorUsername(username: string) {
    return this.usuarios.find((x) => x.username === username);
  }

  insertarUsuario(dto: RegistrarUsuarioDTO, password_hash: string) {
    const existe = this.buscarPorUsername(dto.username);
    if (existe) throw new ConflictException('Username ya existe');

    const usuario = UsuariosMapper.toEntity(dto, password_hash);
    this.usuarios.push(usuario);
    const { password_hash: _ph, ...salida } = usuario;
    return salida;
  }
}
