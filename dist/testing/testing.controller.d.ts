import { BlogsService } from 'src/blogs/blogs.service';
import { PostsService } from 'src/posts/posts.service';
export declare class TestingController {
    private readonly blogsService;
    private readonly postsService;
    constructor(blogsService: BlogsService, postsService: PostsService);
    deleteAllTestingData(): Promise<boolean>;
}
