import { Injectable } from '@nestjs/common';
import { PostEntity } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { UpdatePostDto } from './dto/update-post.dto';
import { CommentEntity } from 'src/entities/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private repository: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
  ) {}

  async getById(id: string): Promise<PostEntity> {
    const post = await this.repository.findOne({
      where: { id },
      relations: ['author'],
    });

    return post;
  }

  async deletePost(id: string) {
    await this.commentRepo.delete({
      post: {
        id: id,
      },
    });
    await this.repository.delete({ id });

    return true;
  }

  async getPosts(query: PaginateQuery): Promise<Paginated<PostEntity>> {
    return await paginate(query, this.repository, {
      sortableColumns: ['createdAt'],
      searchableColumns: ['title'],
      relations: ['author'],
    });
  }

  async createPost(body: CreatePostDto): Promise<PostEntity> {
    const post = this.repository.create({
      title: body.title,
      description: body.description,
      content: body.content,
      author: {
        id: body.authorId,
      },
    });

    const res = await this.repository.save(post);

    return res;
  }

  async updatePost(body: UpdatePostDto): Promise<PostEntity> {
    const post = await this.getById(body.id);
    post.title = body.title;
    post.description = body.description;
    post.content = body.content;

    await this.repository.update(
      {
        id: post.id,
      },
      post,
    );

    return post;
  }
}
