import { Injectable } from '@nestjs/common';
import { AIService } from '../ai/ai.service';
import { ConsultaTutorDto } from './dto/consulta-tutor.dto';

@Injectable()
export class TutorService {
  constructor(private readonly aiService: AIService) {}

  async responderPregunta(data: ConsultaTutorDto) {
    return await this.aiService.generarTexto({
      mensaje: data.pregunta,
      texto: data.pregunta,
    });
  }
}
