import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from 'src/versions/v1/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
