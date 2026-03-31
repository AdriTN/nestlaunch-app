import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Guard que requiere JWT válido. Aplica globalmente o por ruta. */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
