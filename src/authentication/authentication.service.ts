import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';


// Este servicio se ocupara de recuperar usuario y contraseña y si esta todo OK, devolvera un JWT

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
  // aca deberiamos entregar un Jason Web Token como respuesta a un usuario con credenciales validas para iniciar sesion
    return result;
  }
}