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
exports.GetPostsQueryDto = exports.CreateCommentDto = exports.CreatePostDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreatePostDto {
}
exports.CreatePostDto = CreatePostDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Post name can not be empty',
    }),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], CreatePostDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Post description can not be empty',
    }),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreatePostDto.prototype, "shortDescription", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Post url can not be empty',
    }),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreatePostDto.prototype, "content", void 0);
class CreateCommentDto {
}
exports.CreateCommentDto = CreateCommentDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Comment content can no be empty',
    }),
    (0, class_validator_1.MaxLength)(300, { message: 'Max comment length 300 symbols' }),
    (0, class_validator_1.MinLength)(20, { message: 'Min comment length 20 symbols' }),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "content", void 0);
class GetPostsQueryDto {
    constructor() {
        this.sortBy = 'createdAt';
        this.sortDirection = 'desc';
        this.pageNumber = 1;
        this.pageSize = 10;
    }
}
exports.GetPostsQueryDto = GetPostsQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], GetPostsQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['asc', 'desc'], {
        message: `Can be only 'asc' or 'desc' or empty`,
    }),
    __metadata("design:type", String)
], GetPostsQueryDto.prototype, "sortDirection", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => Number(value || 1)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPostsQueryDto.prototype, "pageNumber", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => Number(value || 1)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPostsQueryDto.prototype, "pageSize", void 0);
//# sourceMappingURL=posts.dto.js.map