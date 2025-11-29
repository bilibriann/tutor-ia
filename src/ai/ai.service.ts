import { Injectable } from '@nestjs/common';
import { SolicitudIaDto } from './dto/solicitud-ia.dto';
import OpenAI from 'openai';

@Injectable()
export class AIService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generarTexto(data: SolicitudIaDto): Promise<string> {
    try {
      const respuesta = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Eres un tutor experto en inglés.' },
          { role: 'user', content: data.texto || data.mensaje },
        ],
      });

      const texto = respuesta.choices[0].message.content;

      return texto ?? 'No pude generar una respuesta';
    } catch (error) {
      console.error('Error en OpenAI:', error);
      throw new Error('Fallo al generar texto con la IA');
    }
  }
}
