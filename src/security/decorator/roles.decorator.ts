import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/enum/rol.enum';

export const ROLES_AUTORIZADOS_KEY = 'roles_autorizados';
export const RolesPermitidos = (...roles: Roles[]) =>
  SetMetadata(ROLES_AUTORIZADOS_KEY, roles);
