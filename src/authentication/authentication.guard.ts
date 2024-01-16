import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); // la request se obtiene a partir del contexto de ejecucion
    const token = this.extractTokenFromHeader(request); // se extrae el token de la cabecera (si existe), tomando como parametro la request antes establecida como constante
    if (!token) {
      throw new UnauthorizedException(); // si no hay token el codigo da un error
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      }); // en esta parte del try verificamos el token, con el secret, mediante la funcion jwtservice tomando ambos como parametro, el segundo es un objeto
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
