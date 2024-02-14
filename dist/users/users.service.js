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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crypto_service_1 = require("../crypto/crypto.service");
const users_schema_1 = require("./users.schema");
let UsersService = class UsersService {
    constructor(userModel, cryptoService) {
        this.userModel = userModel;
        this.cryptoService = cryptoService;
    }
    async getUsers(query) {
        const { pageNumber, pageSize, sortBy, sortDirection, searchEmailTerm, searchLoginTerm, } = query;
        const filter = {
            $or: [
                { login: { $regex: searchLoginTerm, $options: 'i' } },
                { email: { $regex: searchEmailTerm, $options: 'i' } },
            ],
        };
        const users = await this.userModel
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(+pageSize * (+pageNumber - 1))
            .limit(+pageSize)
            .exec();
        return users;
    }
    async createUser(body) {
        const { hash, salt } = await this.cryptoService.getHash(body.password);
        const createdUser = new this.userModel({
            ...body,
            confirmed: true,
            confirmationCode: 'created_by_admin',
            hash,
            salt,
        });
        return await createdUser.save();
    }
    async createNewUnconfirmedUser(user) {
        const createdUnconfirmedUser = new this.userModel(user);
        return await createdUnconfirmedUser.save();
    }
    async getUsersCount(searchLoginTerm, searchEmailTerm) {
        const filter = {
            $or: [
                { login: { $regex: searchLoginTerm, $options: 'i' } },
                { email: { $regex: searchEmailTerm, $options: 'i' } },
            ],
        };
        const totalUsersCount = await this.userModel.countDocuments(filter);
        return totalUsersCount;
    }
    async deleteUserById(id) {
        const deletedUser = await this.userModel.findOneAndDelete({ _id: id });
        if (!deletedUser) {
            throw new common_1.HttpException({
                errorMessage: 'User not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return Boolean(deletedUser);
    }
    async deleteAllUsers() {
        return (await this.userModel.deleteMany()).acknowledged;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        crypto_service_1.CryptoService])
], UsersService);
//# sourceMappingURL=users.service.js.map