import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
 
const TEST_USER = {
  id: 1,
  login: 'testUserLogin',
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
    // @ts-ignore
    spyOn(service, 'findOneByCriteria');
    expect(await service.findById(TEST_USER.id)).toEqual(TEST_USER);
    expect(service['findOneByCriteria']).toHaveBeenCalled();
  });

  it('should return a list of all users', async () => {
    expect(await service.getAll()).toEqual([TEST_USER]);
  });

  it('should create new user with unconfirmed email', async () => {
    repository.findOne.mockResolvedValueOnce(undefined as never);
    // @ts-ignore
    spyOn(service, 'checkIfLoginAndEmailAreNotUsed');

    const newUser = await service.createUser(
      TEST_USER.login,
      TEST_USER.email,
      'testPassword',
    );

    expect(newUser.isConfirmed).toBeFalsy();
    expect(newUser.login).toBe(TEST_USER.login);
    expect(newUser.email).toBe(TEST_USER.email);
    expect(newUser.passwordHash).toBeDefined();
    expect(service['checkIfLoginAndEmailAreNotUsed']).toHaveBeenCalled();
  });

  it(
    'should throw an 400 error, when user tries to sign up with existing email or login',
  );
  it('should throw an 400 error, when user tries to sign up with existing email or login', async () => {
    repository.findOne.mockResolvedValueOnce(undefined as never);
    // @ts-ignore
    spyOn(service, 'checkIfLoginAndEmailAreNotUsed').mockResolvedValue([{}]);
    try {
      await service.createUser(
        TEST_USER.login,
        TEST_USER.email,
        'testPassword',
      );
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
