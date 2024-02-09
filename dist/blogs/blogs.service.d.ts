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
/// <reference types="mongoose/types/inferschematype" />
import { Blog, BlogDocument } from './blog.schema';
import { Model } from 'mongoose';
import { CreateBlogDto, GetBlogsQueryDto } from './blogs.dto';
import { Post, PostDocument } from 'src/posts/post.schema';
import { CreatePostDto } from 'src/posts/posts.dto';
export declare class BlogsService {
    private blogModel;
    private postModel;
    constructor(blogModel: Model<BlogDocument>, postModel: Model<PostDocument>);
    findAllBlogs(query: GetBlogsQueryDto): Promise<Blog[]>;
    findBlogById(id: string): Promise<BlogDocument>;
    getTotalBlogsCount(): Promise<number>;
    createBlog(blog: CreateBlogDto): Promise<Blog>;
    createPost(blogId: string, post: CreatePostDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Post> & Post & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Post> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateBlog(id: string, blogDto: CreateBlogDto): Promise<BlogDocument>;
    deleteBlog(id: string): Promise<boolean>;
    deleteAllBlogs(): Promise<boolean>;
}
