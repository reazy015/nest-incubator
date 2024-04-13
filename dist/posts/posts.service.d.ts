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
import { BlogDocument } from '../blogs/blog.schema';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/posts/post.schema';
import { CreatePostDto, GetPostsQueryDto } from 'src/posts/posts.dto';
export declare class PostsService {
    private blogModel;
    private postModel;
    constructor(blogModel: Model<BlogDocument>, postModel: Model<PostDocument>);
    getSinglePostById(id: string): Promise<PostDocument>;
    findAllPostsByBlogId(blogId: string, query: GetPostsQueryDto): Promise<PostDocument[]>;
    getAllPosts(query: GetPostsQueryDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Post> & Post & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Post> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    createPost(body: CreatePostDto & {
        blogId: string;
    }): Promise<PostDocument>;
    updatePost(postId: string, body: CreatePostDto & {
        blogId: string;
    }): Promise<boolean>;
    setPostLikeStatus(id: string, likeStatus: string): Promise<void>;
    getTotalPostsCount(blogId?: string): Promise<number>;
    deleteSinglePostById(id: string): Promise<boolean>;
    deleteAllPosts(): Promise<boolean>;
}
