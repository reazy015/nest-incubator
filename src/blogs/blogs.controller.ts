import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  async createBlog(@Body() blog: CreateBlogDto) {
    const res = await this.blogsService.createBlog(blog);
    return res;
  }

  @Put('/:id')
  async updateBlog(
    @Param('id') id: string,
    @Body() updateBlogDto: CreateBlogDto,
  ) {
    const updated = await this.blogsService.updateBlog(id, updateBlogDto);

    return updated;
  }

  @Delete('/:id')
  async deleteBlog(@Param('id') id: string) {
    const deleted = await this.blogsService.deleteBlog(id);

    return deleted;
  }
}
