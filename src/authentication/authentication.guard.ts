import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {} // jwt es naturalmente el jwt y reflector es de nest y es para trabajar con metadatos(esta bien porque el decorador
  //@Public precisamente setea metadatos: public key : true)

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // si is Public es porque encuetra en el controller el decorador @Public, que funciona para setMetadata en tru
      return true; // retorna true y el resto no se ejecuta, es decir, da acceso al endpoint del controllador
    }
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
