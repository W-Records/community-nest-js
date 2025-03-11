import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyPracticeModule } from './my-practice/my-practice.module';

@Module({
  imports: [MyPracticeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
