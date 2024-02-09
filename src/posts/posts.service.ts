import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../blogs/blog.schema';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/posts/post.schema';
import { GetPostsQueryDto } from 'src/posts/posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async getSinglePostById(id: string): Promise<PostDocument> {
    const post = this.postModel.findById(id);

    return post;
  }

  async findAllPostsByBlogId(
    blogId: string,
    query: GetPostsQueryDto,
  ): Promise<PostDocument[]> {
    const isValidId = Blog.validateId(blogId);

    if (!isValidId) {
      throw new HttpException(
        {
          errorMessage: 'Invalid blog Id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const blog = await this.blogModel.findById(blogId).exec();

    if (!blog) {
      throw new HttpException(
        {
          errorMessage: 'Not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const posts = await this.postModel
      .find({
        blogId: blogId,
      })
      .sort({ [query.sortBy]: query.sortDirection })
      .skip(query.pageSize * (query.pageNumber - 1))
      .limit(query.pageSize)
      .exec();

    return posts;
  }

  async getAllPosts(query: GetPostsQueryDto) {
    const posts = await this.postModel
      .find()
      .sort({ [query.sortBy]: query.sortDirection })
      .skip(query.pageSize * (query.pageNumber - 1))
      .limit(query.pageSize)
      .exec();

    return posts;
  }

  async getTotalPostsCount(): Promise<number> {
    return await this.postModel.countDocuments();
  }

  async deleteAllPosts(): Promise<boolean> {
    const deleted = await this.postModel.deleteMany();

    return deleted.acknowledged;
  }
}
