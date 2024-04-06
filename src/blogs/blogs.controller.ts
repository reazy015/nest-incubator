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
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, GetBlogsQueryDto } from './blogs.dto';
import { CreatePostDto, GetPostsQueryDto } from 'src/posts/posts.dto';
import { PostsService } from 'src/posts/posts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly postsService: PostsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBlogs(
    @Query()
    query: GetBlogsQueryDto,
  ) {
    const blogs = await this.blogsService.findAllBlogs(query);
    const totalCount = await this.blogsService.getTotalBlogsCount(
      query.searchNameTerm,
    );

    return {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: blogs,
    };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleBlog(@Param('id') id: string) {
    const blog = await this.blogsService.findBlogById(id);

    return blog;
  }

  @Get('/:id/posts')
  async getAllBlogsPosts(
    @Param('id') id: string,
    @Query() query: GetPostsQueryDto,
  ) {
    const posts = await this.postsService.findAllPostsByBlogId(id, query);
    const totalCount = await this.postsService.getTotalPostsCount(id);

    return {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: posts,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(BasicAuthGuard)
  async createBlog(@Body() blog: CreateBlogDto) {
    const res = await this.blogsService.createBlog(blog);
    return res;
  }

  @Post('/:id/posts')
  async createPostForSpecificBlog(
    @Param('id') id: string,
    @Body() post: CreatePostDto,
  ) {
    const res = await this.blogsService.createPost(id, post);

    return res;
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(BasicAuthGuard)
  async updateBlog(
    @Param('id') id: string,
    @Body() updateBlogDto: CreateBlogDto,
  ) {
    await this.blogsService.updateBlog(id, updateBlogDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(BasicAuthGuard)
  async deleteBlog(@Param('id') id: string) {
    const deleted = await this.blogsService.deleteBlog(id);

    return deleted;
  }
}
