import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

// Este servicio se ocupara de recuperar usuario y contraseña y si esta todo OK, devolvera un JWT

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // aca deberiamos entregar un Jason Web Token como respuesta a un usuario con credenciales validas para iniciar sesion
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload), // aca devolvemos ese JWT, como access_token , que toma como parametro el user id y el user name para armarlo
      // la funcion signAsync es proporcionada por nest/jwt ,
    };
  }
}
