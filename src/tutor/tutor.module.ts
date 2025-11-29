import { Module } from '@nestjs/common';
import { TutorController } from './tutor.controller';
import { TutorService } from './tutor.service';
import { AIService } from '../ai/ai.service';

@Module({
  controllers: [TutorController],
  providers: [TutorService, AIService],
})
export class TutorModule {}
