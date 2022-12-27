import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type UserDocument = User & Document;

export const ROLES = ["ADMIN", "CUSTOMER"]

@Schema()
export class User {
  @Prop({ required: true })
  full_name: string

  @Prop({ required: true, unique: true, lowercase: true, index: true })
  username: string

  @Prop({ required: true, unique: true, lowercase: true, index: true })
  email: string

  @Prop({ required: true, uppercase: true, default: 'customer' })
  role: string

  @Prop(
    raw({
      address1: { type: String, required: true },
      address2: { type: String, required: true },
      landmark: { type: String },
      city: { type: String, required: true },
      pincode: { type: Number, required: true, min: 100000, max: 999999 },
      state: { type: String, required: true },
    }),
  )
  address: Record<string, any>

  @Prop({ required: true })
  password_hashed: string

  @Prop()
  token_hashed: string
}

export const UserSchema = SchemaFactory.createForClass(User);