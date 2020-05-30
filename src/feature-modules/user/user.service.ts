import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async findById(userId: User['id']): Promise<User> {
    return this.findOneByCriteria({ where: { id: userId } });
  }

  public findByLogin(login: User['login']): Promise<User> {
    return this.findOneByCriteria({ where: { login } });
  }

  public async getAll(criteria?: FindConditions<User>): Promise<User[]> {
    return criteria
      ? this.userRepository.find(criteria)
      : this.userRepository.find();
  }

  public async createUser(
    login: User['login'],
    email: User['email'],
    password: User['passwordHash'],
  ): Promise<User> {
    const result = await this.checkIfLoginAndEmailAreUsed(login, email);
    if (result) {
      throw new BadRequestException(
        `User with such login or email already exists`,
      );
    }

    const newUser = this.userRepository.create();
    console.log('UserService -> newUser', newUser);
    newUser.email = email;
    newUser.passwordHash = await this.getPasswordHash(password);
    newUser.login = login;
    await this.userRepository.save(newUser);

    console.log('UserService -> constructor -> newUser', newUser);
    return newUser;
  }

  private async checkIfLoginAndEmailAreUsed(
    login: string,
    email: string,
  ): Promise<boolean> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.login = :login', { login })
      .orWhere('user.email = :email', { email })
      .getMany();

    return users.length > 0 ? true : false;
  }

  public async updateUser(
    userId: User['id'],
    fieldsToUpdate: Partial<User>,
  ): Promise<User> {
    const user = await this.findById(userId);
    Object.assign(user, fieldsToUpdate);
    this.userRepository.save(user);
    return user;
  }

  public async changePassword(
    user: User,
    oldPassword: string,
    newPassword: string,
  ) {
    if (!(await this.validatePassword(oldPassword, user.passwordHash))) {
      throw new ForbiddenException('Old password is incorrect');
    }
    user.passwordHash = await this.getPasswordHash(newPassword);
    return this.userRepository.save(user);
  }

  public async deleteUserById(userId: User['id']): Promise<void> {
    const user = await this.findById(userId);
    user.deletedAt = Date.now();
    this.userRepository.save(user);
  }

  private async findOneByCriteria(
    criteria: FindOneOptions<User>,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: criteria });
    if (!user || user.deletedAt) {
      throw new NotFoundException();
    }

    return user;
  }

  public validatePassword(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
  }

  public getPasswordHash(password: string) {
    return bcrypt.hash(password, 10);
  }
}
