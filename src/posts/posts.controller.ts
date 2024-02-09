import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { GetPostsQueryDto } from 'src/posts/posts.dto';
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
}
