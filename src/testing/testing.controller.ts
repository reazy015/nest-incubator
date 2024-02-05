import { Controller, Delete } from '@nestjs/common';
import { BlogsService } from 'src/blogs/blogs.service';

@Controller('testing')
export class TestingController {
  constructor(private readonly blogsService: BlogsService) {}

  @Delete('/all-data')
  async deleteAllTestingData(): Promise<boolean> {
    return await this.blogsService.deleteAllBlogs();
  }
}
