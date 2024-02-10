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
export class Like {
  @Prop({ required: true, default: new Date().toISOString() })
  addedAt: string;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  userId: string;
}

export type LikeDocument = HydratedDocument<Like>;
export const LikeSchema = SchemaFactory.createForClass(Like);

@Schema({
  id: false,
  toJSON: {
    versionKey: false,
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
    },
  },
})
export class ExtendedLikesInfo {
  @Prop({ required: true, default: 0 })
  likesCount: number;

  @Prop({ required: true, default: 0 })
  dislikesCount: number;

  @Prop({ required: true, default: 'None' })
  myStatus: string;

  @Prop({ required: true, default: [], type: [LikeSchema] })
  newestLikes: LikeDocument;
}

export type ExtendedLikesInfoDocument = HydratedDocument<ExtendedLikesInfo>;
export const ExtendedLikeInfoSchema =
  SchemaFactory.createForClass(ExtendedLikesInfo);

@Schema({
  toJSON: {
    versionKey: false,
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
    },
  },
})
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  blogId: string;

  @Prop({ required: true })
  blogName: string;

  @Prop({ required: true, default: () => new Date().toISOString() })
  createdAt: string;

  @Prop({ type: ExtendedLikeInfoSchema, default: {} })
  extendedLikesInfo: ExtendedLikesInfoDocument;

  static validateId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }
}

export type PostDocument = HydratedDocument<Post>;

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.statics = {
  validateId: Post.validateId,
};
