import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from 'src/comments/comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async createComment({
    userId,
    userLogin,
    content,
    postId,
  }: {
    userId: string;
    userLogin: string;
    content: string;
    postId: string;
  }): Promise<CommentDocument> {
    const newComment = new this.commentModel({
      content,
      postId,
      commentatorInfo: {
        userId,
        userLogin,
      },
    });

    return newComment.save();
  }

  async getCommentById(id: string): Promise<CommentDocument> {
    const comment = await this.commentModel.findById(id, { postId: 0 });

    return comment;
  }

  async getAllCommentsByPostId(postId: string): Promise<CommentDocument[]> {
    const comments = await this.commentModel.find({ postId }, { postId: 0 });

    return comments;
  }
}
