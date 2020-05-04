import { Global, Module } from '@nestjs/common';
import { configServiceProvider } from './config.service';

@Module({
  providers: [
    configServiceProvider,
  ],
  exports: [
    configServiceProvider,
  ],
})
@Global()
export class ConfigModule {}
