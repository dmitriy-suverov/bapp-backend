import { Module } from '@nestjs/common';
import { postgresConfigProvider, mongoConfigProvider } from './providers';

@Module({
  // imports: process.env.NODE_ENV === 'test' ? [postgresConfigProvider] : [mongoConfigProvider, mysqlConfigProvider],
  imports: [postgresConfigProvider],
})
export class DatabaseModule {}
