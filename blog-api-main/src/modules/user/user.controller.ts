import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  async getUsers(@Paginate() query: PaginateQuery) {
    return await this.service.getUsers(query);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.service.getById(id);
  }
}
