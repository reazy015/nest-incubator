import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({
  toJSON: {
    versionKey: false,
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
    },
  },
})
export class User {
  //   confirmationCode: string | null;
  //   confirmationSentDate: string;
  //   expiresIn: string | null;

  @Prop({ default: false })
  confirmed: boolean;

  @Prop({ required: true })
  hash: string;

  @Prop({ required: true })
  salt: string;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, default: () => new Date().toISOString() })
  createdAt: string;

  static validateId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.statics = {
  validateId: User.validateId,
};
