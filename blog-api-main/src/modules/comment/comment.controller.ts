import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('comments')
export class CommentController {
  constructor(private service: CommentService) {}

  @Get(':postId')
  async getAllByPost(
    @Paginate() query: PaginateQuery,
    @Param('postId') postId: string,
  ) {
    return await this.service.getAllByPost(query, postId);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createComment(@Body() dto: CreateCommentDto) {
    return await this.service.createComment(dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    return await this.service.deleteComment(id);
  }
}
