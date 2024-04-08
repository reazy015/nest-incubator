import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

const DEFAULT_LIKES_INFO = {
  likesCount: 0,
  dislikesCount: 0,
  myStatus: 'None',
};

class CommentLike {
  likesCount: number;
  dislikesCount: number;
  myStatus: string;
}

class CommentatorInfo {
  userId: string;
  userLogin: string;
}

@Schema({
  toJSON: {
    versionKey: false,
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
    },
  },
})
export class Comment {
  @Prop({ required: true })
  postId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  commentatorInfo: CommentatorInfo;

  @Prop({ required: true, default: () => new Date().toISOString() })
  createdAt: string;

  @Prop({ required: true, default: DEFAULT_LIKES_INFO })
  likesInfo: CommentLike;

  static validateId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }
}

export type CommentDocument = HydratedDocument<Omit<Comment, 'postId'>>;

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.statics = {
  validateId: Comment.validateId,
};
