import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { AuthModule } from '../auth/auth.module';
import { CommentEntity } from 'src/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CommentEntity]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
