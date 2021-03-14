import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  })
  user: User;

  @Prop()
  text: string;

  @Prop()
  like: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
