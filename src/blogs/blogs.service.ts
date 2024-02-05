import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { Model } from 'mongoose';
import { CreateBlogDto, GetBlogsQueryDto } from './blogs.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async findAllBlogs(query: GetBlogsQueryDto): Promise<Blog[]> {
    return this.blogModel
      .find({
        name: { $regex: query.searchNameTerm, $options: 'i' },
      })
      .sort({ [query.sortBy]: query.sortDirection })
      .skip(query.pageSize * (query.pageNumber - 1))
      .limit(query.pageSize)
      .exec();
  }

  async getTotalBlogsCount(): Promise<number> {
    return await this.blogModel.countDocuments();
  }

  async createBlog(blog: CreateBlogDto): Promise<Blog> {
    try {
      const createdBlog = new this.blogModel({
        ...blog,
      });

      return createdBlog.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateBlog(id: string, blogDto: CreateBlogDto): Promise<BlogDocument> {
    const blog = await this.blogModel.findOneAndUpdate({ _id: id }, blogDto, {
      new: true,
    });
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
