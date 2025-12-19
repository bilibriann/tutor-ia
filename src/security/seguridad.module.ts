import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AutenticacionGuard } from './guard/autenticacion.guard';
import { AutorizacionGuard } from './guard/autorizacion.guard';

type ExpiresIn = number | `${number}${'s' | 'm' | 'h' | 'd'}`;

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'secret_dev',
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRES ?? '1h') as ExpiresIn,
      },
    }),
  ],
  providers: [AutenticacionGuard, AutorizacionGuard],
  exports: [JwtModule, AutenticacionGuard, AutorizacionGuard],
})
export class SeguridadModule {}
