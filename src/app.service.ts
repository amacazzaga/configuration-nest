import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {} // hemos importado aqui el configService mencionado en el module a partir de configModule
  //ConfigService defines a generic get() method to retrieve a configuration value by key: esto es importante para entender
  getHello(): string {
    return 'Hello World!';
  }
}
// esto deberia estar en un archivo como api-config.service.ts
@Injectable() 
export class ApiConfigService {
  constructor(private configService: ConfigService) {}
  get isAuthEnabled(): boolean {
    // Devuelve true si el valor de la configuración 'AUTH_ENABLED' es 'true' , esto es una configuracion que puede utilizarse en algun otro servicio
    // la idea es usarlo para saber si auht_enables es true or false y luego en consecuencia de ello 
    return this.configService.get('AUTH_ENABLED') === 'true';
  }
}
// y podria usarse en un app.service que se viera asi:
@Injectable()
export class AppServiceWithConfig {
  constructor(apiConfigService: ApiConfigService) {
    if (apiConfigService.isAuthEnabled) {
      // Autenticación está habilitada o no?
    }
  }
}
