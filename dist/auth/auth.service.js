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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crypto_service_1 = require("../crypto/crypto.service");
const users_schema_1 = require("../users/users.schema");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(cryptoService, usersService, userModel) {
        this.cryptoService = cryptoService;
        this.usersService = usersService;
        this.userModel = userModel;
    }
    async registerNewUser(newUser) {
        const { password, login, email } = newUser;
        const { hash, salt } = await this.cryptoService.getHash(password);
        const newUnconfirmedUser = new this.userModel({
            login,
            email,
            hash,
            salt,
        });
        await newUnconfirmedUser.save();
        return true;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [crypto_service_1.CryptoService,
        users_service_1.UsersService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map