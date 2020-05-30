import { Module } from '@nestjs/common';
import { DatabaseModule } from './utils/modules/database/database.module';
import { V1Module } from './versions/v1/v1.module';

@Module({
  imports: [DatabaseModule, V1Module],
  providers: [],
})
export class AppModule {}
