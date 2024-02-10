import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post, PostDocument, PostSchema } from '../posts/post.schema';

@Schema({
  toJSON: {
    versionKey: false,
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
    },
  },
})
export class Blog {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  websiteUrl: string;

  @Prop({ required: true, default: false })
  isMembership: boolean;

  @Prop({ required: true, default: () => new Date().toISOString() })
  createdAt: string;

  static validateId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }

  // @Prop({ type: [PostSchema], default: [], ref: Post.name })
  // posts: PostDocument[];
}

export type BlogDocument = HydratedDocument<Blog>;

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.statics = {
  validateId: Blog.validateId,
};
