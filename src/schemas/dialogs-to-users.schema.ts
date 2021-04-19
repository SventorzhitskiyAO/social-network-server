import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Dialog } from './dialog.schema';

export type DialogsToUsersDocument = DialogsToUsers & Document;

@Schema({ timestamps: true })
export class DialogsToUsers {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dialogs',
  })
  dialog: Dialog;
}

export const DialogsToUsersSchema = SchemaFactory.createForClass(
  DialogsToUsers,
);
