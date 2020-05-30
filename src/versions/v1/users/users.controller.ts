import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from 'src/feature-modules/user/user.service';
import { User } from 'src/feature-modules/user/user.entity';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return this.usersService.findById(userId);
  }
}
