import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TutorService } from './tutor.service';
import { ConsultaTutorDto } from './dto/consulta-tutor.dto';

@ApiTags('Tutor')
@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post('preguntar')
  @ApiOperation({ summary: 'Enviar una pregunta al tutor IA' })
  async preguntar(@Body() data: ConsultaTutorDto) {
    return await this.tutorService.responderPregunta(data);
  }
}
