import { Module } from '@nestjs/common';
import { AuthService } from './authentication.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './authentication.controller';
import { jwtConstants } from './constants';
import { AuthGuard } from './authentication.guard';

@Module({
  imports: [
    UsersModule, // importante: importamos el modulo de usuario en el de auth porque hay una dependencia directa entre el servicio de autenticacion
    // y el de usuario (authenticacion service linea 15)
    JwtModule.register({
      global: true, // esto significa que los controladores y servicios dentro de este modulo estaran disponibles en todo el contexto de la app
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService,AuthGuard], // añadimos el guardia a la lista de providers
  controllers: [AuthController],
  exports: [AuthService,AuthGuard], // lo hacemos global exportandolo a todo el modulo
})
export class AuthModule {}
