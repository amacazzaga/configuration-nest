import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

// aqui veremos dos maneras de definir un esquema, que son necesarios en mongoose, y tiene correlato con mongodb en el sentido de recuperar informacion de la base de datos:collections
export type CatDocument = HydratedDocument<Cat>;
@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}
export const CatSchemaAsDecorator = SchemaFactory.createForClass(Cat);

/* o tambien podemos hacerlo de la siguiente forma
export const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});*/

