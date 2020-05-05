import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';
import { Match } from '../utils/decorators/match';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @Match('password')
  repeatPassword: string;
}
