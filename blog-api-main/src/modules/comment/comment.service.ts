import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { CommentEntity } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}

  async getAllByPost(
    query: PaginateQuery,
    postId: string,
  ): Promise<Paginated<CommentEntity>> {
    return await paginate(query, this.repository, {
      where: {
        post: {
          id: postId,
        },
      },
      sortableColumns: ['createdAt'],
      relations: ['user', 'post'],
    });
  }

  async createComment(body: CreateCommentDto): Promise<CommentEntity> {
    const comment = this.repository.create({
      content: body.content,
      user: {
        id: body.userId,
      },
      post: {
        id: body.postId,
      },
    });
    const res = await this.repository.save(comment);

    const commentWithUser = await this.repository.findOne({
      where: {
        id: res.id,
      },
      relations: ['user'],
    });

    return commentWithUser;
  }

  async deleteComment(id: string) {
    await this.repository.delete({ id });

    return true;
  }
}
