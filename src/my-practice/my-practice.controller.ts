import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MyPracticeService } from './my-practice.service';
import { CreateMyPracticeDto } from './dto/create-my-practice.dto';
import { UpdateMyPracticeDto } from './dto/update-my-practice.dto';

@Controller('my-practice')
export class MyPracticeController {
  constructor(private readonly myPracticeService: MyPracticeService) {}

  @Post()
  create(@Body() createMyPracticeDto: CreateMyPracticeDto) {
    return this.myPracticeService.create(createMyPracticeDto);
  }

  @Get()
  findAll() {
    return this.myPracticeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myPracticeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMyPracticeDto: UpdateMyPracticeDto) {
    return this.myPracticeService.update(+id, updateMyPracticeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myPracticeService.remove(+id);
  }
}
