import { Module } from '@nestjs/common';
import { TutorModule } from './tutor/tutor.module';

@Module({
  imports: [TutorModule],
})
export class AppModule {}
