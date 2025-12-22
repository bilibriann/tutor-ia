import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginUsuarioDTO } from './dto/login.usuario.dto';
import { RegistrarUsuarioDTO } from './dto/registrar.usuario.dto';
import { GetAccessTokenDTO } from './dto/get.access_token.dto';
import { LoginGuard } from '../security/guard/login.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LoginGuard)
  @ApiBody({ type: LoginUsuarioDTO })
  @ApiOkResponse({ type: GetAccessTokenDTO })
  async login(
    @Body() _dto: LoginUsuarioDTO,
    @Req() req: Request,
  ): Promise<GetAccessTokenDTO> {
    const usuario = req.usuario;

    if (!usuario) {
      throw new UnauthorizedException('Login inválido');
    }

    return this.authService.login(usuario);
  }

  @Post('register')
  @ApiBody({ type: RegistrarUsuarioDTO })
  @ApiCreatedResponse({ description: 'Usuario creado (sin passwordHash)' })
  register(@Body() dto: RegistrarUsuarioDTO) {
    return this.authService.register(dto);
  }
}
