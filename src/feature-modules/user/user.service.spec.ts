import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { async } from 'rxjs/internal/scheduler/async';

const TEST_USER = {
  id: 1,
  email: 'email@test.com',
  createdAt: Date.now(),
} as User;

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

describe('UserService', () => {
  let service: UserService;
  let repository: MockType<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(() => TEST_USER),
            find: jest.fn(() => [TEST_USER]),
            save: obj => obj,
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    // @ts-ignore
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should return a user by id', async () => {
    expect(await service.findById(TEST_USER.id)).toEqual(TEST_USER);
  });

  it('should return a list of all users', async () => {
    expect(await service.getAll()).toEqual([TEST_USER]);
  });

  it('should create new user', async () => {
    repository.findOne.mockResolvedValueOnce(undefined as never);
    console.log('repository', repository);
  });

  it('should throw an 400 error, when user tries to sign up with existing email or login')
});
