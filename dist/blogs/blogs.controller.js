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
exports.BlogsController = void 0;
const common_1 = require("@nestjs/common");
const blogs_service_1 = require("./blogs.service");
const blogs_dto_1 = require("./blogs.dto");
const posts_dto_1 = require("../posts/posts.dto");
const posts_service_1 = require("../posts/posts.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let BlogsController = class BlogsController {
    constructor(blogsService, postsService) {
        this.blogsService = blogsService;
        this.postsService = postsService;
    }
    async getAllBlogs(query) {
        const blogs = await this.blogsService.findAllBlogs(query);
        const totalCount = await this.blogsService.getTotalBlogsCount(query.searchNameTerm);
        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount,
            items: blogs,
        };
    }
    async getSingleBlog(id) {
        const blog = await this.blogsService.findBlogById(id);
        return blog;
    }
    async getAllBlogsPosts(id, query) {
        const posts = await this.postsService.findAllPostsByBlogId(id, query);
        const totalCount = await this.postsService.getTotalPostsCount(id);
        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount,
            items: posts,
        };
    }
    async createBlog(blog) {
        const res = await this.blogsService.createBlog(blog);
        return res;
    }
    async createPostForSpecificBlog(id, post) {
        const res = await this.blogsService.createPost(id, post);
        return res;
    }
    async updateBlog(id, updateBlogDto) {
        await this.blogsService.updateBlog(id, updateBlogDto);
    }
    async deleteBlog(id) {
        const deleted = await this.blogsService.deleteBlog(id);
        return deleted;
    }
};
exports.BlogsController = BlogsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blogs_dto_1.GetBlogsQueryDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getAllBlogs", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getSingleBlog", null);
__decorate([
    (0, common_1.Get)('/:id/posts'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, posts_dto_1.GetPostsQueryDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getAllBlogsPosts", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blogs_dto_1.CreateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Post)('/:id/posts'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, posts_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "createPostForSpecificBlog", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, blogs_dto_1.CreateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "updateBlog", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "deleteBlog", null);
exports.BlogsController = BlogsController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService,
        posts_service_1.PostsService])
], BlogsController);
//# sourceMappingURL=blogs.controller.js.map