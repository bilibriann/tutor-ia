import { IsString, IsNotEmpty } from 'class-validator';

export class SolicitudIaDto {
  @IsString()
  @IsNotEmpty()
  mensaje: string;

  @IsString()
  @IsNotEmpty()
  texto: string;
}
