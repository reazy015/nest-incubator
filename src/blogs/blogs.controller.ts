import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpCode,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, GetBlogsQueryDto } from './blogs.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  async getAllBlogs(
    @Query()
    query: GetBlogsQueryDto,
  ) {
    const blogs = await this.blogsService.findAllBlogs(query);
    const totalCount = await this.blogsService.getTotalBlogsCount();

    return {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: blogs,
    };
  }

  @Post()
  @HttpCode(201)
  async createBlog(@Body() blog: CreateBlogDto) {
    const res = await this.blogsService.createBlog(blog);
    return res;
  }

  @Put('/:id')
  @HttpCode(204)
  async updateBlog(
    @Param('id') id: string,
    @Body() updateBlogDto: CreateBlogDto,
  ) {
    await this.blogsService.updateBlog(id, updateBlogDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteBlog(@Param('id') id: string) {
    const deleted = await this.blogsService.deleteBlog(id);

    return deleted;
  }
}
