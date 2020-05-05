import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository, FindConditions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async findById(userId: User['id']): Promise<User> {
    return this.findOneByCriteria({ id: userId });
  }

  public async createUser(
    login: User['login'],
    email: User['email'],
    password: User['passwordHash'],
  ): Promise<User> {
    const newUser = this.userRepository.create();
    console.log('UserService -> newUser', newUser);
    newUser.email = email;
    newUser.passwordHash = await newUser.getPasswordHash(password);
    newUser.login = login;
    this.userRepository.save(newUser);

    console.log('UserService -> constructor -> newUser', newUser);
    return newUser;
  }

  public async getAll(criteria?: FindConditions<User>): Promise<User[]> {
    return criteria
      ? this.userRepository.find(criteria)
      : this.userRepository.find();
  }

  public async updateUser(
    userId: User['id'],
    dto: Partial<UpdateUserDto>,
  ): Promise<User> {
    const user = await this.findById(userId);
    Object.assign(user, dto);
    this.userRepository.save(user);
    return user;
  }

  public async changePassword(
    user: User,
    oldPassword: string,
    newPassword: string,
  ) {
    if (!(await user.validatePassword(oldPassword))) {
      throw new ForbiddenException('Old password is incorrect');
    }
    user.passwordHash = await user.getPasswordHash(newPassword);
    return this.userRepository.save(user);
  }

  public async deleteUserById(userId: User['id']): Promise<void> {
    const user = await this.findById(userId);
    user.deletedAt = Date.now();
  }

  private async findOneByCriteria(
    criteria: FindConditions<User>,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: criteria });
    if (user.deletedAt) {
      throw new NotFoundException();
    }

    return user;
  }
}
