import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { GetPostsQueryDto } from 'src/posts/posts.dto';
import { PostsService } from 'src/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllPosts(@Query() query: GetPostsQueryDto) {
    const posts = await this.postsService.getAllPosts(query);

    return posts;
  }
}
