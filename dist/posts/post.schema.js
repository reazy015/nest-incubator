"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = exports.Post = exports.ExtendedLikeInfoSchema = exports.ExtendedLikeInfo = exports.LikeSchema = exports.Like = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Like = class Like {
};
exports.Like = Like;
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date().toISOString() }),
    __metadata("design:type", String)
], Like.prototype, "addedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Like.prototype, "login", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Like.prototype, "userId", void 0);
exports.Like = Like = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            versionKey: false,
            virtuals: true,
            transform: (_, ret) => {
                delete ret._id;
            },
        },
    })
], Like);
exports.LikeSchema = mongoose_1.SchemaFactory.createForClass(Like);
let ExtendedLikeInfo = class ExtendedLikeInfo {
};
exports.ExtendedLikeInfo = ExtendedLikeInfo;
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], ExtendedLikeInfo.prototype, "likesCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], ExtendedLikeInfo.prototype, "dislikesCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'None' }),
    __metadata("design:type", String)
], ExtendedLikeInfo.prototype, "myStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: [], type: [exports.LikeSchema] }),
    __metadata("design:type", Object)
], ExtendedLikeInfo.prototype, "newestLikes", void 0);
exports.ExtendedLikeInfo = ExtendedLikeInfo = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            versionKey: false,
            virtuals: true,
            transform: (_, ret) => {
                delete ret._id;
            },
        },
    })
], ExtendedLikeInfo);
exports.ExtendedLikeInfoSchema = mongoose_1.SchemaFactory.createForClass(ExtendedLikeInfo);
let Post = class Post {
    static validateId(id) {
        return mongoose_2.default.Types.ObjectId.isValid(id);
    }
};
exports.Post = Post;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "shortDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "blogId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "blogName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date().toISOString() }),
    __metadata("design:type", String)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.ExtendedLikeInfoSchema, default: {} }),
    __metadata("design:type", Object)
], Post.prototype, "extendedLikeInfo", void 0);
exports.Post = Post = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            versionKey: false,
            virtuals: true,
            transform: (_, ret) => {
                delete ret._id;
            },
        },
    })
], Post);
exports.PostSchema = mongoose_1.SchemaFactory.createForClass(Post);
exports.PostSchema.statics = {
    validateId: Post.validateId,
};
//# sourceMappingURL=post.schema.js.map