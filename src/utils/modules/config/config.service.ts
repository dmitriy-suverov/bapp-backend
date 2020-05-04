import * as Joi from 'joi';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { Provider } from '@nestjs/common';
import { ConfigException } from './config.exception';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private envConfig: EnvConfig;

  load() {
    const config = this.loadFile();
    this.envConfig = this.validateInput(config);
  }

  getValue(key: string) {
    return this.envConfig[key];
  }

  validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object(this.schema);
    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new ConfigException(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  loadFile() {
    return fs.existsSync('.env') ? dotenv.parse(fs.readFileSync('.env')) : {};
  }

  get schema() {
    return {
      ENV: Joi.string(),
      JWT_SECRET_KEY: Joi.string().default(process.env.JWT_SECRET_KEY),
      PORT: Joi.number().default(3000),
      TYPEORM_HOST: Joi.string().default(process.env.TYPEORM_HOST),
      TYPEORM_PORT: Joi.number().default(process.env.TYPEORM_PORT),
      TYPEORM_USERNAME: Joi.string().default(process.env.TYPEORM_USERNAME),
      TYPEORM_PASSWORD: Joi.empty().default(process.env.TYPEORM_PASSWORD),
      TYPEORM_DATABASE: Joi.string().default(process.env.TYPEORM_DATABASE),
      TYPEORM_LOGGING: Joi.boolean().default(process.env.TYPEORM_LOGGING),
      TYPEORM_ENTITIES: Joi.string().default(process.env.TYPEORM_ENTITIES),
      TYPEORM_MIGRATIONS: Joi.string().default(process.env.TYPEORM_MIGRATIONS),
      TYPEORM_MIGRATIONS_DIR: Joi.string().default(
        process.env.TYPEORM_MIGRATIONS_DIR,
      ),
      TYPEORM_CONNECTION: Joi.string().default(process.env.TYPEORM_CONNECTION),
      TYPEORM_MONGO_HOST: Joi.string().default(process.env.TYPEORM_MONGO_HOST),
      TYPEORM_MONGO_PORT: Joi.number().default(process.env.TYPEORM_MONGO_PORT),
      TYPEORM_MONGO_USERNAME: Joi.empty().default(
        process.env.TYPEORM_MONGO_USERNAME,
      ),
      TYPEORM_MONGO_PASSWORD: Joi.empty().default(
        process.env.TYPEORM_MONGO_PASSWORD,
      ),
      TYPEORM_MONGO_DATABASE: Joi.string().default(
        process.env.TYPEORM_MONGO_DATABASE,
      ),
      TYPEORM_MONGO_ENTITIES: Joi.string().default(
        process.env.TYPEORM_MONGO_ENTITIES,
      ),
      TYPEORM_MONGO_MIGRATIONS: Joi.string().default(
        process.env.TYPEORM_MONGO_MIGRATIONS,
      ),
      WEB_SERVER_URL: Joi.string().default(process.env.WEB_SERVER_URL),
    } as { [key: string]: any };
  }
}

export const configServiceProvider: Provider = {
  provide: ConfigService,
  useFactory: () => {
    const configService = new ConfigService();
    configService.load();
    return configService;
  },
};
