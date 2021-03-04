import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    minlength: 2,
    maxlength: 30,
  })
  login: string;

  @Prop({
    lowercase: true,
  })
  email: string;

  @Prop({
    minlength: 2,
    maxlength: 30,
  })
  firstName: string;

  @Prop({
    minlength: 2,
    maxlength: 30,
  })
  secondName: string;

  @Prop()
  avatar?: string;

  @Prop({
    lowercase: true,
    default(): string {
      return 'user';
    },
  })
  role: string;

  @Prop({
    set: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
