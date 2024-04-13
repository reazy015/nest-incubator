import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../blogs/blog.schema';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/posts/post.schema';
import { CreatePostDto, GetPostsQueryDto } from 'src/posts/posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async getSinglePostById(id: string): Promise<PostDocument> {
    if (!Post.validateId(id)) {
      throw new HttpException(
        {
          errorMessage: 'Invalid blog Id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const post = await this.postModel.findById(id).exec();

    if (!post) {
      throw new HttpException(
        {
          errorMessage: 'Not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

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

    const blog = await this.blogModel.findById(blogId);

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

  async createPost(
    body: CreatePostDto & { blogId: string },
  ): Promise<PostDocument> {
    const isValidBogId = Blog.validateId(body.blogId);

    if (!isValidBogId) {
      throw new HttpException(
        {
          errorMessage: 'Invalid blog Id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const blog = await this.blogModel.findById(body.blogId);

    if (!blog) {
      throw new HttpException(
        {
          errorMessage: 'Not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const newPost = new this.postModel({
      ...body,
      blogName: blog.name,
    });

    try {
      await newPost.save();
    } catch (exception) {
      throw new HttpException(
        {
          errorMessage: exception,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return newPost;
  }

  async updatePost(postId: string, body: CreatePostDto & { blogId: string }) {
    const isValidPostId = Post.validateId(postId);

    if (!isValidPostId) {
      throw new HttpException(
        {
          errorMessage: 'Invalid post Id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const post = await this.postModel.findOneAndUpdate(
      { _id: postId },
      { $set: { ...body } },
      { new: true },
    );

    if (!post) {
      throw new HttpException(
        {
          errorMessage: 'Not found',
        },
        HttpStatus.NOT_FOUND,
      );
    } else {
      return true;
    }
  }

  async setPostLikeStatus(id: string, likeStatus: string) {
    const isValidPostId = Post.validateId(id);

    if (!isValidPostId) {
      throw new BadRequestException('Invalid post Id');
    }

    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }
  }

  async getTotalPostsCount(blogId?: string): Promise<number> {
    if (blogId) {
      return await this.postModel.find({ blogId }).countDocuments();
    }
    return await this.postModel.countDocuments();
  }

  async deleteSinglePostById(id: string): Promise<boolean> {
    const isValidPostId = Post.validateId(id);

    if (!isValidPostId) {
      throw new HttpException(
        {
          errorMessage: 'Invalid post Id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const post = await this.postModel.findById(id);

    if (!post) {
      throw new HttpException(
        {
          errorMessage: 'Post not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.postModel.findOneAndDelete({ _id: id });
  }

  async deleteAllPosts(): Promise<boolean> {
    const deleted = await this.postModel.deleteMany();

    return deleted.acknowledged;
  }
}
