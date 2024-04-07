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
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crypto_service_1 = require("../crypto/crypto.service");
const mail_service_1 = require("../mail/mail.service");
const users_schema_1 = require("../users/users.schema");
const common_2 = require("@nestjs/common");
let AuthService = class AuthService {
    constructor(cryptoService, jwtService, mailService, userModel) {
        this.cryptoService = cryptoService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.userModel = userModel;
    }
    async registerNewUser(newUser) {
        const { password, login, email } = newUser;
        const emailExists = await this.userModel.findOne({ email });
        if (emailExists) {
            throw new common_2.BadRequestException({
                field: 'email',
                message: 'Email already in use',
            });
        }
        const loginExists = await this.userModel.findOne({ login });
        if (loginExists) {
            throw new common_2.BadRequestException({
                field: 'login',
                message: 'Login already in use',
            });
        }
        const confirmationCode = this.cryptoService.getConfirmationCode();
        const { hash, salt } = await this.cryptoService.getHash(password);
        const newUnconfirmedUser = new this.userModel({
            login,
            email,
            hash,
            salt,
            confirmationCode,
        });
        const mailSent = await this.mailService.sendConfimationEmail(email, confirmationCode);
        if (!mailSent) {
            throw new Error('On mail sent error occured');
        }
        await newUnconfirmedUser.save();
        return true;
    }
    async resendRegistrationEmail(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_2.BadRequestException({
                field: 'email',
                message: 'No user with this email',
            });
        }
        if (user.confirmed) {
            throw new common_2.BadRequestException({
                field: 'email',
                message: 'Already confirmed',
            });
        }
        const newConfirmationCode = this.cryptoService.getConfirmationCode();
        const mailSent = await this.mailService.sendConfimationEmail(email, newConfirmationCode);
        if (!mailSent) {
            throw new Error('On mail sent error occured');
        }
        user.confirmationCode = newConfirmationCode;
        await user.save();
        return true;
    }
    async confirmUser(confirmationCode) {
        const user = await this.userModel.findOne({ confirmationCode });
        if (!user) {
            throw new common_2.BadRequestException({
                field: 'code',
                message: 'Invalid code',
            });
        }
        if (user.confirmed) {
            throw new common_2.BadRequestException({
                field: 'code',
                message: 'User already confirmed',
            });
        }
        user.confirmed = true;
        await user.save();
        return true;
    }
    async validateUser(loginOrEmail, password) {
        const user = await this.userModel.findOne({
            $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Wrong credentials');
        }
        const isValidPassword = await this.cryptoService.validatePasswordHash(password, user.hash);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async login(user) {
        return {
            accessToken: this.jwtService.sign(user),
            refreshToken: this.jwtService.sign(user),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [crypto_service_1.CryptoService,
        jwt_1.JwtService,
        mail_service_1.MailService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map