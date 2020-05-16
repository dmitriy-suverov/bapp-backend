import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  providers: [AuthService, UserService],
  imports: [UserModule],
})
export class AuthModule {}
