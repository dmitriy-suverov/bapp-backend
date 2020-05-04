import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';

export const mongoConfigProvider = TypeOrmModule.forRootAsync({
  name: 'mongodb',
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return {
      type: 'mongodb',
      host: config.getValue('TYPEORM_MONGO_HOST'),
      port: parseInt(config.getValue('TYPEORM_MONGO_PORT'), 10),
      username: config.getValue('TYPEORM_MONGO_USERNAME'),
      password: config.getValue('TYPEORM_MONGO_PASSWORD'),
      database: config.getValue('TYPEORM_MONGO_DATABASE'),
      useNewUrlParser: true,
      synchronize: true,
      entities: [__dirname + '/../**/*.entity.mongo{.ts,.js}'],
      migrations: [__dirname + '/../../migration_mongo/*.ts'],
    };
  },
});

export const mysqlConfigProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    console.log('forRootAsync');
    const configDatabaseName = 'TYPEORM_DATABASE';
    const databaseName = config.getValue(configDatabaseName);

    if (!databaseName) {
      throw new Error(
        `The "${configDatabaseName}" parameter in '.env' file is not set.`,
      );
    }

    const database =
      process.env.NODE_ENV === 'test'
        ? `${
            databaseName.endsWith('_test')
              ? databaseName
              : databaseName + '_test'
          }`
        : databaseName;
    return {
      type: 'postgres',
      host: config.getValue('TYPEORM_HOST'),
      port: parseInt(config.getValue('TYPEORM_PORT'), 10),
      username: config.getValue('TYPEORM_USERNAME'),
      password: config.getValue('TYPEORM_PASSWORD'),
      database,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../../migration/*.ts'],
      multipleStatements: process.env.NODE_ENV === 'test',
      logging: !!config.getValue('TYPEORM_LOGGING'),
      supportBigNumbers: true,
      bigNumberStrings: false,
      charset: 'utf8mb4',
    };
  },
});
