import { Module } from '@nestjs/common';
import { AIModule } from './ai/ai.module';
import { TutorModule } from './tutor/tutor.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { SeguridadModule } from './security/seguridad.module';

@Module({
  imports: [SeguridadModule, AIModule, TutorModule, UsuariosModule, AuthModule],
})
export class AppModule {}
