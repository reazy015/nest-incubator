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
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto, CreatePostDto, GetPostsQueryDto } from 'src/posts/posts.dto';
import { PostsService } from 'src/posts/posts.service';
export declare class PostsController {
    private readonly postsService;
    private readonly commentsService;
    constructor(postsService: PostsService, commentsService: CommentsService);
    getAllPosts(query: GetPostsQueryDto): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./post.schema").Post> & import("./post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./post.schema").Post> & import("./post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    getSinglePost(id: string): Promise<import("mongoose").Document<unknown, {}, import("./post.schema").Post> & import("./post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createPost(post: CreatePostDto & {
        blogId: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./post.schema").Post> & import("./post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllPostComments(id: string): Promise<(import("mongoose").Document<unknown, {}, Omit<import("../comments/comments.schema").Comment, "postId">> & Omit<import("../comments/comments.schema").Comment, "postId"> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    createComment(id: string, comment: CreateCommentDto, req: any): Promise<{
        id: any;
        commentatorInfo: {
            userId: string;
            userLogin: string;
        };
        content: string;
        likesInfo: {
            likesCount: number;
            dislikesCount: number;
            myStatus: string;
        };
        createdAt: string;
    }>;
    updateComment(): Promise<boolean>;
    setPostLikeStatus(id: string, { likeStatus }: {
        likeStatus: string;
    }): Promise<void>;
    updatePost(post: CreatePostDto & {
        blogId: string;
    }, id: string): Promise<boolean>;
    deleteSinglePostById(id: string): Promise<boolean>;
}
