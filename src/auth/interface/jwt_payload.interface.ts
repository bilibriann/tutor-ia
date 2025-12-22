import { Roles } from 'src/enum/rol.enum';

export interface JWTPayload {
  sub: string;
  user: string;
  rol: Roles;
}
