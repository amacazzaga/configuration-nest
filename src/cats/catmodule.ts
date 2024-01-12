import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { CatsController } from './cats.controller';
//import { CatsService } from './cats.service';
import { Cat, CatSchemaAsDecorator } from './cat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchemaAsDecorator }])],//la necesidad de extraer el nombre de la clase con .name está relacionada con la forma en que 
  //Mongoose asigna nombres a los modelos. 
  //Cuando se define un modelo en Mongoose, este necesita un nombre único que generalmente se deriva del nombre de la clase del modelo.
  //controllers: [CatsController],
  //providers: [CatsService],
})
export class CatsModule {}