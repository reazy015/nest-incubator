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
exports.GetBlogsQueryDto = exports.CreateBlogDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateBlogDto {
}
exports.CreateBlogDto = CreateBlogDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Blog name can not be empty',
    }),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Blog description can not be empty',
    }),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Blog url can not be empty',
    }),
    __metadata("design:type", String)
], CreateBlogDto.prototype, "websiteUrl", void 0);
class GetBlogsQueryDto {
    constructor() {
        this.searchNameTerm = '';
        this.sortBy = 'createdAt';
        this.sortDirection = 'desc';
        this.pageNumber = 1;
        this.pageSize = 10;
    }
}
exports.GetBlogsQueryDto = GetBlogsQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], GetBlogsQueryDto.prototype, "searchNameTerm", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], GetBlogsQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['asc', 'desc'], {
        message: `Can be only 'asc' or 'desc' or empty`,
    }),
    __metadata("design:type", String)
], GetBlogsQueryDto.prototype, "sortDirection", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetBlogsQueryDto.prototype, "pageNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(10),
    __metadata("design:type", Number)
], GetBlogsQueryDto.prototype, "pageSize", void 0);
//# sourceMappingURL=blogs.dto.js.map