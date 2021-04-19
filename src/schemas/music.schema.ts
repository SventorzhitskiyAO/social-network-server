import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type MusicDocument = Music & Document;

@Schema()
export class Music {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  })
  user: User;

  @Prop()
  title: string;

  @Prop()
  link: string;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
