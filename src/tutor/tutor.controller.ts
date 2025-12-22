import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { TutorService } from './tutor.service';
import { ConsultaTutorDto } from './dto/consulta-tutor.dto';
import { AutenticacionGuard } from '../security/guard/autenticacion.guard';
import { JWTPayload } from '../auth/interface/jwt_payload.interface';

type RequestConUsuario = Request & { usuario_payload?: JWTPayload };

@ApiTags('Tutor')
@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AutenticacionGuard)
  @UseGuards(AutenticacionGuard)
  @Post('preguntar')
  @ApiOperation({ summary: 'Enviar pregunta al tutor (requiere JWT)' })
  async preguntar(
    @Body() data: ConsultaTutorDto,
    @Req() req: RequestConUsuario,
  ) {
    const usuario = req.usuario_payload;

    // Si llegó aquí, el guard normalmente ya validó y el payload existe
    return await this.tutorService.responderPregunta(data, usuario!);
  }
}
