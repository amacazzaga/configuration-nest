import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })], // busca los value key directamente de .env creado en el root de nuestra app
  // si necesitaramos buscar variables de entorno en otro lado podriamos usar  envFilePath: '.development.env', dentro del objeto de forRoot()
  // isGlobal hace al modulo de configuracion Global y nos permite utilizarlo en otros lugares 
  // Cuando configuras el ConfigModule se obtiene un ConfigService que se puede
  // inyectar en  servicios y controladores para acceder a la configuración de la aplicación.
})
export class AppModule {}
