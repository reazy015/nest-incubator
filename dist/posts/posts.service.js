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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blog_schema_1 = require("../blogs/blog.schema");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("./post.schema");
let PostsService = class PostsService {
    constructor(blogModel, postModel) {
        this.blogModel = blogModel;
        this.postModel = postModel;
    }
    async getSinglePostById(id) {
        const post = this.postModel.findById(id);
        return post;
    }
    async findAllPostsByBlogId(blogId, query) {
        const isValidId = blog_schema_1.Blog.validateId(blogId);
        if (!isValidId) {
            throw new common_1.HttpException({
                errorMessage: 'Invalid blog Id',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const blog = await this.blogModel.findById(blogId).exec();
        if (!blog) {
            throw new common_1.HttpException({
                errorMessage: 'Not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const posts = await this.postModel
            .find({
            blogId: blogId,
        })
            .sort({ [query.sortBy]: query.sortDirection })
            .skip(query.pageSize * (query.pageNumber - 1))
            .limit(query.pageSize)
            .exec();
        return posts;
    }
    async getAllPosts(query) {
        const posts = await this.postModel
            .find()
            .sort({ [query.sortBy]: query.sortDirection })
            .skip(query.pageSize * (query.pageNumber - 1))
            .limit(query.pageSize)
            .exec();
        return posts;
    }
    async getTotalPostsCount() {
        return await this.postModel.countDocuments();
    }
    async deleteAllPosts() {
        const deleted = await this.postModel.deleteMany();
        return deleted.acknowledged;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __param(1, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PostsService);
//# sourceMappingURL=posts.service.js.map