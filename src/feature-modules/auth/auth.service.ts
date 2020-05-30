import {
  Injectable,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { TrimPrivateUserDataInterceptor } from '../user/trim-private-user-data.interceptor';

@Injectable()
@UseInterceptors(TrimPrivateUserDataInterceptor)
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  public async loginUser(
    login: User['login'],
    password: string,
  ): Promise<{
    user: User;
    token: string;
  }> {
    const user = await this.usersService.findByLogin(login);
    if (!this.usersService.validatePassword(password, user.passwordHash)) {
      throw new UnauthorizedException();
    }

    return {
      user,
      token: 'jwt',
    };
  }

  public async registerUser(
    login: User['login'],
    email: User['email'],
    password: string,
  ): Promise<User> {
    const newUser = await this.usersService.createUser(login, email, password);
    return newUser;
  }

  public async changePassword(
    userId: User['id'],
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.usersService.findById(userId);

    this.usersService.changePassword(user, oldPassword, newPassword);
  }
}
