import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegistrarUsuarioDTO } from './dto/registrar.usuario.dto';
import { LoginUsuarioDTO } from './dto/login.usuario.dto';
import { GetAccessTokenDTO } from './dto/get.access_token.dto';
import { LoginGuard } from '../security/guard/login.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registrar usuario' })
  @Post('registrar')
  registrar(@Body() dto: RegistrarUsuarioDTO) {
    return this.authService.registrar(dto);
  }

  @ApiOperation({ summary: 'Login y obtener JWT' })
  @ApiResponse({ status: 201, type: GetAccessTokenDTO })
  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Body() _dto: LoginUsuarioDTO, @Req() req) {
    // LoginGuard deja el usuario en req.usuario
    return this.authService.login(req.usuario);
  }
}
