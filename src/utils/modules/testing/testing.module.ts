import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TestingService } from './testing.service';

@Module({
  imports: [DatabaseModule],
  providers: [TestingService],
  exports: [TestingService],
})
export class TestingModule {}
