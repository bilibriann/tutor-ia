import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegistrarUsuarioDTO {
  @ApiProperty({ example: 'brian' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'brian1234' })
  @IsString()
  @MinLength(6)
  password!: string;
}
