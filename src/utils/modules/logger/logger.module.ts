import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { Log } from './log.entity.mongo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogInterceptor } from './log.interceptor';

@Module({
  providers: [
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
  ],
  imports: [
    TypeOrmModule.forFeature([Log], 'mongodb'),
  ],
  exports: [
    LoggerService,
  ],
})
export class LoggerModule {
}
