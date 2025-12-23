import { Roles } from '../../enum/rol.enum';

export interface JWTPayload {
  sub: string;
  user: string;
  rol: Roles;
}
