import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentsService } from 'src/comments/comments.service';
import {
  CreateCommentDto,
  CreatePostDto,
  GetPostsQueryDto,
} from 'src/posts/posts.dto';
import { PostsService } from 'src/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllPosts(@Query() query: GetPostsQueryDto) {
    const posts = await this.postsService.getAllPosts(query);
    const totalCount = await this.postsService.getTotalPostsCount();

    return {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: posts,
    };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getSinglePost(@Param('id') id: string) {
    const post = await this.postsService.getSinglePostById(id);

    return post;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() post: CreatePostDto & { blogId: string }) {
    const created = await this.postsService.createPost(post);

    return created;
  }

  @Get('/:id/comments')
  @HttpCode(HttpStatus.CREATED)
  async getAllPostComments(@Param('id') id: string) {
    const comments = await this.commentsService.getAllCommentsByPostId(id);

    return comments;
  }

  @Post('/:id/comments')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Param('id') id: string,
    @Body() comment: CreateCommentDto,
    @Request() req,
  ) {
    const created = await this.commentsService.createComment({
      userId: req.user.userId,
      userLogin: req.user.login,
      content: comment.content,
      postId: id,
    });

    const {
      id: commentId,
      commentatorInfo,
      content,
      likesInfo,
      createdAt,
    } = created;

    return {
      id: commentId,
      commentatorInfo,
      content,
      likesInfo,
      createdAt,
    };
  }

  @Put('/:id/comments')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async updateComment() {
    // @Request() req, // @Body() comment: CreateCommentDto, // @Param('id') id: string,
    return false;
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePost(
    @Body() post: CreatePostDto & { blogId: string },
    @Param('id') id: string,
  ) {
    const updated = await this.postsService.updatePost(id, post);

    return updated;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSinglePostById(@Param('id') id: string) {
    const deleted = await this.postsService.deleteSinglePostById(id);

    return deleted;
  }
}
