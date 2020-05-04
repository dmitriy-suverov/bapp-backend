import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from 'src/feature-modules/user/user.service';
import { User } from 'src/feature-modules/user/user.entity';
import { CreateUserDto } from 'src/feature-modules/user/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return this.usersService.findOne(userId);
  }

  @Post()
  async signup(@Body() dto: CreateUserDto): Promise<User> {
    const { email, login, password } = dto;
    return this.usersService.createUser(email, login, password);
  }
}
