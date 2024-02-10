import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePostDto, GetPostsQueryDto } from 'src/posts/posts.dto';
import { PostsService } from 'src/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllPosts(@Query() query: GetPostsQueryDto) {
    const posts = await this.postsService.getAllPosts(query);
    const totalCount = await this.postsService.getTotalPostsCount();

    return {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: posts,
    };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getSinglePost(@Param('id') id: string) {
    const post = await this.postsService.getSinglePostById(id);

    return post;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() post: CreatePostDto & { blogId: string }) {
    const created = await this.postsService.createPost(post);

    return created;
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePost(
    @Body() post: CreatePostDto & { blogId: string },
    @Param('id') id: string,
  ) {
    const updated = await this.postsService.updatePost(id, post);

    return updated;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSinglePostById(@Param('id') id: string) {
    const deleted = await this.postsService.deleteSinglePostById(id);

    return deleted;
  }
}
