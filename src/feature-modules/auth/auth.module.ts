import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from 'src/versions/v1/auth/auth.controller';

@Module({
  exports: [AuthService],
  providers: [AuthService],
  // controllers: [AuthController],
  imports: [UserModule],
})
export class AuthModule {}
