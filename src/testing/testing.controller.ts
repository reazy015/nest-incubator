import { Controller, Delete, HttpCode } from '@nestjs/common';
import { BlogsService } from 'src/blogs/blogs.service';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';

@Controller('testing')
export class TestingController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @Delete('/all-data')
  @HttpCode(204)
  async deleteAllTestingData(): Promise<boolean> {
    await this.blogsService.deleteAllBlogs();
    await this.postsService.deleteAllPosts();
    await this.usersService.deleteAllUsers();

    return true;
  }
}
