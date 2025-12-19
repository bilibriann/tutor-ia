import { ApiProperty } from '@nestjs/swagger';

export class GetAccessTokenDTO {
  @ApiProperty()
  access_token: string;
}
