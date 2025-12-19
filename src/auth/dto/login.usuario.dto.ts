import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUsuarioDTO {
  @ApiProperty({ example: 'brian' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'brian1234' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
