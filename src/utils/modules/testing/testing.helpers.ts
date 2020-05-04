import { INestApplication, ModuleMetadata } from '@nestjs/common/interfaces';
import { Test } from '@nestjs/testing';
import { TestingService } from './testing.service';
import { JwtService } from '@nestjs/jwt';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { TestingModule } from './testing.module';
import { UserModule } from '../../user/user.module';
import { AnyExceptionFilter } from '../../filters/any-exception.filter';

export const getTestStuff = async (metadata: ModuleMetadata): Promise<[INestApplication, TestingService]> => {
  metadata.imports.push(ConfigModule, DatabaseModule, TestingModule, UserModule);
  const moduleFixture = await Test.createTestingModule(metadata).compile();
  const app = moduleFixture.createNestApplication();
  app.useGlobalFilters(new AnyExceptionFilter(null, null)).useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    validationError: { target: false },
  }));
  await app.init();
  return [app, app.get<TestingService>(TestingService)];
};

export const createAuthHeader = (app: INestApplication, userId: number, token: string) => {
  const jwtService = app.get(JwtService);
  const jwtToken = jwtService.sign({ userId, token });
  return { authorization: `bearer ${jwtToken}` };
};
