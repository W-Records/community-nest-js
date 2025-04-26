import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}


  // 根据前端传递的id，修改指定车位的name字段的值
  @Post('updateCarport')
  updateCarport(@Body() updateCarDto: UpdateCarDto) {
    return this.carService.updateCarport(updateCarDto);
  }


  // 根据传递的id删除车位信息
  @Post('removeCarport/:id')
  removeCarport(@Param('id') id: string) {
    return this.carService.removeCarport(+id);
  }


  // 根据传递得id，移除此车位的用户信息
  @Post('removeUserId/:carid')
  removeUserId(@Param('carid') carid) {
    return this.carService.removeUserId(carid);
  }



  // 获取车位信息，类型type不能为消防车位，车位不能被持有就是userid不能有值
  @Get('getCarInfo')
  getCarInfo() {
    return this.carService.getCarInfo();
  }



  // 修改指定车位的信息，修改的字段包括type，atTime，userid
  @Post('updateCarInfo')
  updateCarInfo(@Body() updateCarDto: UpdateCarDto) {
    return this.carService.updateCarInfo(updateCarDto);
  }


  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
