import { Module } from '@nestjs/common';
import { mysqlConfigProvider, mongoConfigProvider } from './providers';

@Module({
  // imports: process.env.NODE_ENV === 'test' ? [mysqlConfigProvider] : [mongoConfigProvider, mysqlConfigProvider],
  imports: [mysqlConfigProvider],
})
export class DatabaseModule {}
