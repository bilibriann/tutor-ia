import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { AutenticacionGuard } from '../security/guard/autenticacion.guard';
import { AutorizacionGuard } from '../security/guard/autorizacion.guard';
import { RolesPermitidos } from '../security/decorator/roles.decorator';
import { Roles } from 'src/enum/rol.enum';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiBearerAuth()
  @UseGuards(AutenticacionGuard, AutorizacionGuard)
  @RolesPermitidos(Roles.ADMIN)
  @Get()
  listar() {
    return this.usuariosService.listar();
  }
}
