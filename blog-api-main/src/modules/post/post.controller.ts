import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private service: PostService) {}

  @Get()
  async getPosts(@Paginate() query: PaginateQuery) {
    return await this.service.getPosts(query);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createPost(@Body() dto: CreatePostDto) {
    return await this.service.createPost(dto);
  }

  @UseGuards(AuthGuard)
  @Put('update')
  async updatePost(@Body() dto: UpdatePostDto) {
    return await this.service.updatePost(dto);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.service.deletePost(id);
  }
}
