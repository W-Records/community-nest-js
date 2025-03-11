import { Injectable } from '@nestjs/common';
import { CreateMyPracticeDto } from './dto/create-my-practice.dto';
import { UpdateMyPracticeDto } from './dto/update-my-practice.dto';

@Injectable()
export class MyPracticeService {
  create(createMyPracticeDto: CreateMyPracticeDto) {
    return 'This action adds a new myPractice';
  }

  findAll() {
    return `This action returns all myPractice HH`;
  }

  findOne(id: number) {
    return `This action returns a #${id} myPractice`;
  }

  update(id: number, updateMyPracticeDto: UpdateMyPracticeDto) {
    return `This action updates a #${id} myPractice`;
  }

  remove(id: number) {
    return `This action removes a #${id} myPractice`;
  }
}
