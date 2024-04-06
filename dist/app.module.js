"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const posts_controller_1 = require("./posts/posts.controller");
const blogs_controller_1 = require("./blogs/blogs.controller");
const blogs_service_1 = require("./blogs/blogs.service");
const blog_schema_1 = require("./blogs/blog.schema");
const testing_controller_1 = require("./testing/testing.controller");
const posts_service_1 = require("./posts/posts.service");
const post_schema_1 = require("./posts/post.schema");
const users_controller_1 = require("./users/users.controller");
const users_service_1 = require("./users/users.service");
const users_schema_1 = require("./users/users.schema");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const mail_service_1 = require("./mail/mail.service");
const crypto_service_1 = require("./crypto/crypto.service");
const local_strategy_1 = require("./auth/local.strategy");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const basic_strategy_1 = require("./auth/basic.strategy");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.DB_URL),
            mongoose_1.MongooseModule.forFeature([
                { name: blog_schema_1.Blog.name, schema: blog_schema_1.BlogSchema },
                { name: post_schema_1.Post.name, schema: post_schema_1.PostSchema },
                { name: users_schema_1.User.name, schema: users_schema_1.UserSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.SECRET_KEY,
                signOptions: { expiresIn: '5m' },
            }),
        ],
        controllers: [
            app_controller_1.AppController,
            blogs_controller_1.BlogsController,
            posts_controller_1.PostsController,
            testing_controller_1.TestingController,
            users_controller_1.UsersController,
            auth_controller_1.AuthController,
        ],
        providers: [
            app_service_1.AppService,
            blogs_service_1.BlogsService,
            posts_service_1.PostsService,
            users_service_1.UsersService,
            auth_service_1.AuthService,
            mail_service_1.MailService,
            crypto_service_1.CryptoService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            basic_strategy_1.BasicStrategy,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map