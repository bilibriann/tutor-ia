import type { Usuario } from '../usuarios/entities/usuarios.entity';
import type { JWTPayload } from '../auth/interface/jwt_payload.interface';

declare global {
  namespace Express {
    interface Request {
      usuario?: Usuario;
      usuarioPayload?: JWTPayload;
    }
  }
}

export {};
