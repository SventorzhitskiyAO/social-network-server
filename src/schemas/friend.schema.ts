import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type FriendDocument = Friend & Document;

@Schema()
export class Friend {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  })
  userTwo: User;

  @Prop({
    default: false,
  })
  follow: boolean;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
