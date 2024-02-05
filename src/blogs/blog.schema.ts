import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;

      delete ret._id;
      delete ret.__v;
    },
  },
})
@Exclude()
export class Blog {
  _id: mongoose.Types.ObjectId;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  websiteUrl: string;

  @Prop({ required: true, default: false })
  isMembership: boolean;

  @Prop({ required: true, default: new Date().toISOString() })
  createdAt: string;
}

export type BlogDocument = HydratedDocument<Blog>;

export const BlogSchema = SchemaFactory.createForClass(Blog);
