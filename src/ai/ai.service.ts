import { Injectable } from '@nestjs/common';
import { SolicitudIaDto } from './dto/solicitud-ia.dto';
import OpenAI from 'openai';

@Injectable()
export class AIService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generarTexto(data: SolicitudIaDto): Promise<string> {
    const entrada = (data.texto || data.mensaje || '').trim();

    // ✅ MODO MOCK (por defecto)
    if ((process.env.MODO_IA || 'mock') === 'mock') {
      if (!entrada) return 'MOCK: Envíame una pregunta para practicar inglés.';

      if (
        entrada.toLowerCase().includes('will') &&
        entrada.toLowerCase().includes('going to')
      ) {
        return "MOCK: 'Will' se usa para decisiones espontáneas/promesas; 'going to' para planes ya decididos o evidencia.";
      }

      return `MOCK: Entendido. Reformula esta frase en pasado simple: "${entrada}"`;
    }

    // ✅ MODO OPENAI (solo si tú lo activas)
    try {
      const respuesta = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'Eres un tutor experto en inglés. Explica claro y con ejemplos.',
          },
          { role: 'user', content: entrada },
        ],
      });

      return (
        respuesta.choices[0].message.content ?? 'No pude generar una respuesta'
      );
    } catch (error) {
      console.error('Error en OpenAI:', error);
      throw new Error('Fallo al generar texto con la IA');
    }
  }
}
