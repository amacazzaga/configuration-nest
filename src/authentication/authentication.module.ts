import { Module } from '@nestjs/common';
import { AuthService } from './authentication.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './authentication.controller';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule, // importante: importamos el modulo de usuario en el de auth porque hay una dependencia directa entre el servicio de autenticacion
    // y el de usuario (authenticacion service linea 15)
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
