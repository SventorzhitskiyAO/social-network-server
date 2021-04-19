import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DialogDocument = Dialog & Document;

@Schema({ timestamps: true })
export class Dialog {
  @Prop()
  name: string;
}

export const DialogSchema = SchemaFactory.createForClass(Dialog);
