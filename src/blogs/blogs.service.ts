import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { Model } from 'mongoose';
import { CreateBlogDto, GetBlogsQueryDto } from './blogs.dto';
import { Post, PostDocument } from 'src/posts/post.schema';
import { CreatePostDto } from 'src/posts/posts.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async findAllBlogs(query: GetBlogsQueryDto): Promise<Blog[]> {
    const blogs = await this.blogModel
      .find({
        name: { $regex: query.searchNameTerm, $options: 'i' },
      })
      .sort({ [query.sortBy]: query.sortDirection })
      .skip(query.pageSize * (query.pageNumber - 1))
      .limit(query.pageSize)
      .exec();

    return blogs;
  }

  async findBlogById(id: string): Promise<BlogDocument> {
    const isValidId = Blog.validateId(id);

    if (!isValidId) {
      throw new HttpException(
        {
          errorMessage: 'Invalid blog Id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const blog = await this.blogModel.findById(id).populate('posts').exec();

    if (!blog) {
      throw new HttpException(
        {
          errorMessage: 'Not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return blog;
  }

  async getTotalBlogsCount(): Promise<number> {
    return await this.blogModel.countDocuments();
  }

  async createBlog(blog: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel({
      ...blog,
    });

    return createdBlog.save();
  }

  async createPost(blogId: string, post: CreatePostDto) {
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

    const createdPost = new this.postModel({
      ...post,
      blogName: blog.name,
      blogId: blog._id,
    });

    try {
      await createdPost.save();
    } catch (exception) {
      throw new HttpException(
        {
          errorMessage: exception,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return createdPost;
  }

  async updateBlog(id: string, blogDto: CreateBlogDto): Promise<BlogDocument> {
    const blog = await this.blogModel.findOneAndUpdate({ _id: id }, blogDto, {
      new: true,
    });

    if (!blog) {
      throw new HttpException(
        {
          errorMessage: 'Not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const saved = await blog.save();

    return saved;
  }

  async deleteBlog(id: string): Promise<boolean> {
    const deleted = await this.blogModel.deleteOne({ _id: id });

    return deleted.acknowledged;
  }

  async deleteAllBlogs(): Promise<boolean> {
    const deleted = await this.blogModel.deleteMany();

    return deleted.acknowledged;
  }
}
