/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { BlogsService } from './blogs.service';
import { CreateBlogDto, GetBlogsQueryDto } from './blogs.dto';
import { CreatePostDto, GetPostsQueryDto } from 'src/posts/posts.dto';
import { PostsService } from 'src/posts/posts.service';
export declare class BlogsController {
    private readonly blogsService;
    private readonly postsService;
    constructor(blogsService: BlogsService, postsService: PostsService);
    getAllBlogs(query: GetBlogsQueryDto): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: import("./blog.schema").Blog[];
    }>;
    getSingleBlog(id: string): Promise<import("mongoose").Document<unknown, {}, import("./blog.schema").Blog> & import("./blog.schema").Blog & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllBlogsPosts(id: string, query: GetPostsQueryDto): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: (import("mongoose").Document<unknown, {}, import("../posts/post.schema").Post> & import("../posts/post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    createBlog(blog: CreateBlogDto): Promise<import("./blog.schema").Blog>;
    createPostForSpecificBlog(id: string, post: CreatePostDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../posts/post.schema").Post> & import("../posts/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../posts/post.schema").Post> & import("../posts/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateBlog(id: string, updateBlogDto: CreateBlogDto): Promise<void>;
    deleteBlog(id: string): Promise<boolean>;
}
