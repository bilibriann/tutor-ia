import { Module } from '@nestjs/common';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { SeguridadModule } from '../security/seguridad.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginGuard } from '../security/guard/login.guard';

@Module({
  imports: [SeguridadModule, UsuariosModule],
  controllers: [AuthController],
  providers: [AuthService, LoginGuard],
  exports: [AuthService],
})
export class AuthModule {}
