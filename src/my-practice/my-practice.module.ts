import { Module } from '@nestjs/common';
import { MyPracticeService } from './my-practice.service';
import { MyPracticeController } from './my-practice.controller';

@Module({
  controllers: [MyPracticeController],
  providers: [MyPracticeService],
})
export class MyPracticeModule {}
