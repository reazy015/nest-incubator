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
exports.CommentSchema = exports.Comment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const DEFAULT_LIKES_INFO = {
    likesCount: 0,
    dislikesCount: 0,
    myStatus: 'None',
};
class CommentLike {
}
class CommentatorInfo {
}
let Comment = class Comment {
    static validateId(id) {
        return mongoose_2.default.Types.ObjectId.isValid(id);
    }
};
exports.Comment = Comment;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Comment.prototype, "postId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", CommentatorInfo)
], Comment.prototype, "commentatorInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: () => new Date().toISOString() }),
    __metadata("design:type", String)
], Comment.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: DEFAULT_LIKES_INFO }),
    __metadata("design:type", CommentLike)
], Comment.prototype, "likesInfo", void 0);
exports.Comment = Comment = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            versionKey: false,
            virtuals: true,
            transform: (_, ret) => {
                delete ret._id;
            },
        },
    })
], Comment);
exports.CommentSchema = mongoose_1.SchemaFactory.createForClass(Comment);
exports.CommentSchema.statics = {
    validateId: Comment.validateId,
};
//# sourceMappingURL=comments.schema.js.map