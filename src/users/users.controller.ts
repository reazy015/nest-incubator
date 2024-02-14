import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';
import { CreateUserDto, GetUsersQueryDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@Query() query: GetUsersQueryDto) {
    const users = await this.usersService.getUsers(query);
    const totalCount = await this.usersService.getUsersCount(
      query.searchLoginTerm,
      query.searchEmailTerm,
    );

    return {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: users.map(({ id, login, email, createdAt }) => ({
        id,
        login,
        email,
        createdAt,
      })),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @UseGuards(BasicAuthGuard)
  async createUser(@Body() body: CreateUserDto) {
    const { id, login, email, createdAt } =
      await this.usersService.createUser(body);

    return {
      id,
      login,
      email,
      createdAt,
    };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.usersService.deleteUserById(id);

    return deletedUser;
  }
}
