import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepairService } from './repair.service';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';

@Controller('repair')
export class RepairController {
  constructor(private readonly repairService: RepairService) {}



  // 根据前端转递的id，修改status字段为已处理
  @Post('updateStatus/:Id')
  updateStatus(@Param('Id') Id) {
    return this.repairService.updateStatus(Id);
  }


  // 查询用户报修信息
  @Get('findUserRepairs/:userId')
  findUserRepairs(@Param('userId') userId) {
    return this.repairService.findUserRepairs(userId);
  }

  @Post()
  create(@Body() createRepairDto: CreateRepairDto) {
    return this.repairService.create(createRepairDto);
  }

  @Get()
  findAll() {
    return this.repairService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repairService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepairDto: UpdateRepairDto) {
    return this.repairService.update(+id, updateRepairDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repairService.remove(+id);
  }
}
