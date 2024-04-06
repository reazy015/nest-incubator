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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blog_schema_1 = require("./blog.schema");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("../posts/post.schema");
let BlogsService = class BlogsService {
    constructor(blogModel, postModel) {
        this.blogModel = blogModel;
        this.postModel = postModel;
    }
    async findAllBlogs(query) {
        const blogs = await this.blogModel
            .find({
            name: { $regex: query.searchNameTerm, $options: 'i' },
        })
            .sort({ [query.sortBy]: query.sortDirection })
            .skip(query.pageSize * (query.pageNumber - 1))
            .limit(query.pageSize)
            .exec();
        return blogs;
    }
    async findBlogById(id) {
        const isValidId = blog_schema_1.Blog.validateId(id);
        if (!isValidId) {
            throw new common_1.HttpException('Invalid blog Id', common_1.HttpStatus.BAD_REQUEST);
        }
        const blog = await this.blogModel.findById(id).exec();
        if (!blog) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        return blog;
    }
    async getTotalBlogsCount(name) {
        if (name) {
            const count = await this.blogModel
                .find({
                name: { $regex: name, $options: 'i' },
            })
                .countDocuments();
            return count;
        }
        return await this.blogModel.countDocuments();
    }
    async createBlog(blog) {
        const createdBlog = new this.blogModel({
            ...blog,
        });
        return createdBlog.save();
    }
    async createPost(blogId, post) {
        const isValidId = blog_schema_1.Blog.validateId(blogId);
        if (!isValidId) {
            throw new common_1.HttpException('Invalid blog Id', common_1.HttpStatus.BAD_REQUEST);
        }
        const blog = await this.blogModel.findById(blogId).exec();
        if (!blog) {
            throw new common_1.HttpException({
                errorMessage: 'Not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const createdPost = new this.postModel({
            ...post,
            blogName: blog.name,
            blogId: blog._id,
        });
        try {
            await createdPost.save();
        }
        catch (exception) {
            throw new common_1.HttpException(exception, common_1.HttpStatus.BAD_REQUEST);
        }
        return createdPost;
    }
    async updateBlog(id, blogDto) {
        const isValidId = blog_schema_1.Blog.validateId(id);
        if (!isValidId) {
            throw new common_1.HttpException('Invalid blog Id', common_1.HttpStatus.BAD_REQUEST);
        }
        const blog = await this.blogModel.findOneAndUpdate({ _id: id }, blogDto, {
            new: true,
        });
        if (!blog) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        const saved = await blog.save();
        return saved;
    }
    async deleteBlog(id) {
        const isValidId = blog_schema_1.Blog.validateId(id);
        if (!isValidId) {
            throw new common_1.HttpException('Invalid blog Id', common_1.HttpStatus.BAD_REQUEST);
        }
        const blog = await this.blogModel.findById(id).exec();
        if (!blog) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        return (await blog.deleteOne()).acknowledged;
    }
    async deleteAllBlogs() {
        const deleted = await this.blogModel.deleteMany();
        return deleted.acknowledged;
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __param(1, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map