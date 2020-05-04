import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './utils/modules/database/database.module';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { V1Module } from './versions/v1/v1.module';

@Module({
  imports: [DatabaseModule, RouterModule.forRoutes(routes), V1Module],

  controllers: [AppController],
  providers: [],
})
export class AppModule {}
