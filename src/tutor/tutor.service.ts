import { Injectable } from '@nestjs/common';
import { AIService } from '../ai/ai.service';
import { ConsultaTutorDto } from './dto/consulta-tutor.dto';
import { JWTPayload } from '../auth/interface/jwt_payload.interface';

@Injectable()
export class TutorService {
  constructor(private readonly aiService: AIService) {}

  async responderPregunta(data: ConsultaTutorDto, usuario: JWTPayload) {
    const respuesta = await this.aiService.generarTexto({
      mensaje: data.pregunta,
      texto: data.pregunta,
    });

    return {
      usuario: usuario.user,
      rol: usuario.rol,
      pregunta: data.pregunta,
      respuesta,
    };
  }
}
