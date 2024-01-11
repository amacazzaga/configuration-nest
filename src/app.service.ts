import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {} // hemos importado aqui el configService mencionado en el module a partir de configModule
  getHello(): string {
    return 'Hello World!';
  }
}
