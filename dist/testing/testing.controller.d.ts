import { BlogsService } from 'src/blogs/blogs.service';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
export declare class TestingController {
    private readonly blogsService;
    private readonly postsService;
    private readonly usersService;
    constructor(blogsService: BlogsService, postsService: PostsService, usersService: UsersService);
    deleteAllTestingData(): Promise<boolean>;
}
