import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    require: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
  })
  login: string;

  @Prop({
    require: true,
    lowercase: true,
    unique: true,
  })
  email: string;

  @Prop({
    minlength: 2,
    maxlength: 30,
    require: false,
  })
  firstName: string;

  @Prop({
    minlength: 2,
    maxlength: 30,
    require: false,
  })
  secondName: string;

  @Prop()
  avatar?: string;

  @Prop({
    lowercase: true,
    default(): string {
      return 'user';
    },
    require: false,
  })
  role: string;

  @Prop({
    set: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    require: true,
  })
  password: string;

  @Prop({
    default(): string {
      return '';
    },
  })
  facebook: string;

  @Prop({
    default(): string {
      return '';
    },
  })
  vk: string;

  @Prop({
    default(): string {
      return '';
    },
  })
  github: string;

  @Prop({
    default(): string {
      return '';
    },
  })
  instagram: string;

  @Prop()
  skill: string;

  @Prop()
  aboutMe: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
