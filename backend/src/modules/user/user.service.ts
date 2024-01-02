import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async getUsers(query: PaginateQuery): Promise<Paginated<UserEntity>> {
    try {
      return await paginate(query, this.repository, {
        sortableColumns: ['username'],
        searchableColumns: ['username'],
        select: ['id', 'username', 'email'],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async getById(id: string): Promise<UserEntity> {
    try {
      const user = await this.repository.findOne({
        where: {
          id,
        },
      });
      delete user.password;

      return user;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.repository.findOne({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      console.log(error.message);
    }
  }

  async createUser(body: CreateUserDto): Promise<UserEntity> {
    try {
      const user = this.repository.create({
        username: body.username,
        email: body.email,
        password: body.password,
      });

      const res = await this.repository.save(user);
      delete user.password;

      return res;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await this.repository.delete({
        id,
      });

      return true;
    } catch {
      return false;
    }
  }
}
