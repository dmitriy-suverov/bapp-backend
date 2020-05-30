import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';
import { UserEntityConstraints } from 'src/feature-modules/user/user.entity';

export class LoginDto {
  @IsString()
  @MinLength(UserEntityConstraints.login.min)
  @MaxLength(UserEntityConstraints.login.max)
  login: string;

  @IsString()
  @MinLength(UserEntityConstraints.password.min)
  @MaxLength(UserEntityConstraints.password.max)
  password: string;
}
