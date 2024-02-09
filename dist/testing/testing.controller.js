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
exports.TestingController = void 0;
const common_1 = require("@nestjs/common");
const blogs_service_1 = require("../blogs/blogs.service");
const posts_service_1 = require("../posts/posts.service");
let TestingController = class TestingController {
    constructor(blogsService, postsService) {
        this.blogsService = blogsService;
        this.postsService = postsService;
    }
    async deleteAllTestingData() {
        await this.blogsService.deleteAllBlogs();
        await this.postsService.deleteAllPosts();
        return true;
    }
};
exports.TestingController = TestingController;
__decorate([
    (0, common_1.Delete)('/all-data'),
    (0, common_1.HttpCode)(204),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestingController.prototype, "deleteAllTestingData", null);
exports.TestingController = TestingController = __decorate([
    (0, common_1.Controller)('testing'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService,
        posts_service_1.PostsService])
], TestingController);
//# sourceMappingURL=testing.controller.js.map