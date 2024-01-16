import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, cache: true })], // busca los value key directamente de .env creado en el root de nuestra app
  // si necesitaramos buscar variables de entorno en otro lado podriamos usar  envFilePath: '.development.env', dentro del objeto de forRoot()
  // isGlobal hace al modulo de configuracion Global y nos permite utilizarlo en otros lugares
  // Cuando configuras el ConfigModule se obtiene un ConfigService que se puede
  // inyectar en  servicios y controladores para acceder a la configuración de la aplicación.
  //Por otro lado como acceder a .env puede ser algo lento, podemos setear cache en el objeto para mejorar un poco la performance
}) // AQUI PODRIAMOS CONECTAR CON NUESTRA BASE DE DATOS DE MONGODB!, CON TYPEORM O PASANDO AL OBJETO
export class AppModule {}

/*
importante: 
*/ 

/*
PODRIAMOS USAR UN ESQUEMA DE VALIDACION SI QUISIERAMOS EN NUESTRO APP MODULE, SEGUN LA DOCUMENTACION INSTALANDO JOI COSA QUE NO HICIMOS PERO DEJAMOS EL EJEMPLO
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string() valida a string
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000), valida a number
      }),
      validationOptions: { // en caso de cumplir o no con los esquemas
        allowUnknown: false,
        abortEarly: true,
      },
    }),
  ],
})
export class AppModule {}
*/
