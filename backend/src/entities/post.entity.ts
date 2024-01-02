import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date = new Date();

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  author: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
