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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const comments_service_1 = require("../comments/comments.service");
const posts_dto_1 = require("./posts.dto");
const posts_service_1 = require("./posts.service");
let PostsController = class PostsController {
    constructor(postsService, commentsService) {
        this.postsService = postsService;
        this.commentsService = commentsService;
    }
    async getAllPosts(query) {
        const posts = await this.postsService.getAllPosts(query);
        const totalCount = await this.postsService.getTotalPostsCount();
        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount,
            items: posts,
        };
    }
    async getSinglePost(id) {
        const post = await this.postsService.getSinglePostById(id);
        return post;
    }
    async createPost(post) {
        const created = await this.postsService.createPost(post);
        return created;
    }
    async getAllPostComments(id) {
        const comments = await this.commentsService.getAllCommentsByPostId(id);
        return comments;
    }
    async createComment(id, comment, req) {
        const created = await this.commentsService.createComment({
            userId: req.user.userId,
            userLogin: req.user.login,
            content: comment.content,
            postId: id,
        });
        const { id: commentId, commentatorInfo, content, likesInfo, createdAt, } = created;
        return {
            id: commentId,
            commentatorInfo,
            content,
            likesInfo,
            createdAt,
        };
    }
    async updateComment() {
        return false;
    }
    async setPostLikeStatus() {
        return false;
    }
    async updatePost(post, id) {
        const updated = await this.postsService.updatePost(id, post);
        return updated;
    }
    async deleteSinglePostById(id) {
        const deleted = await this.postsService.deleteSinglePostById(id);
        return deleted;
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.GetPostsQueryDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getSinglePost", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)('/:id/comments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPostComments", null);
__decorate([
    (0, common_1.Post)('/:id/comments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, posts_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createComment", null);
__decorate([
    (0, common_1.Put)('/:id/comments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Put)('/:id/like-status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "setPostLikeStatus", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deleteSinglePostById", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService,
        comments_service_1.CommentsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map