import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PostEntity } from './post.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date = new Date();

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => PostEntity)
  post: PostEntity;
}
