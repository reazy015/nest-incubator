import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PostsController } from './posts/posts.controller';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsService } from './blogs/blogs.service';
import { Blog, BlogSchema } from 'src/blogs/blog.schema';
import { TestingController } from './testing/testing.controller';
import { PostsService } from './posts/posts.service';
import { Post, PostSchema } from 'src/posts/post.schema';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User, UserSchema } from 'src/users/users.schema';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { MailService } from './mail/mail.service';
import { CryptoService } from './crypto/crypto.service';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { BasicStrategy } from 'src/auth/basic.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [
    AppController,
    BlogsController,
    PostsController,
    TestingController,
    UsersController,
    AuthController,
  ],
  providers: [
    AppService,
    BlogsService,
    PostsService,
    UsersService,
    AuthService,
    MailService,
    CryptoService,
    LocalStrategy,
    JwtStrategy,
    BasicStrategy,
  ],
})
export class AppModule {}
