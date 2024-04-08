import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getCommentById(@Param('id') id: string) {
    const comment = await this.commentsService.getCommentById(id);

    return comment;
  }
}
