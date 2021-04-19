import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type AlbumDocument = Album & Document;

@Schema({ timestamps: true })
export class Album {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  })
  user: User;

  @Prop()
  name: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
