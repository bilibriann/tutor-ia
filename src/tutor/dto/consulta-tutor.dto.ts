import { IsString, IsNotEmpty } from 'class-validator';

export class ConsultaTutorDto {
  @IsString()
  @IsNotEmpty()
  pregunta: string;
}
