import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Album } from './album.schema';

export type PhotoDocument = Photo & Document;

@Schema({ timestamps: true })
export class Photo {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'albums',
  })
  album: Album;

  @Prop({
    default: '',
  })
  text: string;

  @Prop()
  path: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
