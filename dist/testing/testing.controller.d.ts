import { BlogsService } from 'src/blogs/blogs.service';
export declare class TestingController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    deleteAllTestingData(): Promise<boolean>;
}
