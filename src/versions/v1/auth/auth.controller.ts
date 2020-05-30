import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from 'src/feature-modules/user/dto/create-user.dto';
import { User } from 'src/feature-modules/user/user.entity';
import { AuthService } from 'src/feature-modules/auth/auth.service';
import { LoginDto } from 'src/feature-modules/auth/dto/login.dto';
import { TrimPrivateUserDataInterceptor } from 'src/feature-modules/user/trim-private-user-data.interceptor';

@Controller('v1/auth')
@UseInterceptors(TrimPrivateUserDataInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() dto: LoginDto) {
    const { login, password } = dto;
    return this.authService.loginUser(login, password);
  }

  @Post('register')
  public async register(@Body() dto: CreateUserDto): Promise<User> {
    const { email, login, password } = dto;
    console.log("AuthController -> constructor -> dto", dto)
    return this.authService.registerUser(email, login, password);
  }
}
