import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne(userId);
    // return this.users.find(user => user.id === userId);
  }

  async createUser(
    login: User['login'],
    email: User['email'],
    password: User['passwordHash'],
  ): Promise<User> {
    const newUser = this.userRepository.create();
    newUser.email = email;
    newUser.passwordHash = await newUser.getPasswordHash(password);
    newUser.login = login;
    this.userRepository.save(newUser);

    console.log('UserService -> constructor -> newUser', newUser);
    return newUser;
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
