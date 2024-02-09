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
import mongoose, { HydratedDocument } from 'mongoose';
export declare class Like {
    addedAt: string;
    login: string;
    userId: string;
}
export type LikeDocument = HydratedDocument<Like>;
export declare const LikeSchema: mongoose.Schema<Like, mongoose.Model<Like, any, any, any, mongoose.Document<unknown, any, Like> & Like & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Like, mongoose.Document<unknown, {}, mongoose.FlatRecord<Like>> & mongoose.FlatRecord<Like> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare class ExtendedLikesInfo {
    likesCount: number;
    dislikesCount: number;
    myStatus: string;
    newestLikes: LikeDocument;
}
export type ExtendedLikesInfoDocument = HydratedDocument<ExtendedLikesInfo>;
export declare const ExtendedLikeInfoSchema: mongoose.Schema<ExtendedLikesInfo, mongoose.Model<ExtendedLikesInfo, any, any, any, mongoose.Document<unknown, any, ExtendedLikesInfo> & ExtendedLikesInfo & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ExtendedLikesInfo, mongoose.Document<unknown, {}, mongoose.FlatRecord<ExtendedLikesInfo>> & mongoose.FlatRecord<ExtendedLikesInfo> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare class Post {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
    extendedLikesInfo: ExtendedLikesInfoDocument;
    static validateId(id: string): boolean;
}
export type PostDocument = HydratedDocument<Post>;
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, mongoose.Document<unknown, any, Post> & Post & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post, mongoose.Document<unknown, {}, mongoose.FlatRecord<Post>> & mongoose.FlatRecord<Post> & {
    _id: mongoose.Types.ObjectId;
}>;
