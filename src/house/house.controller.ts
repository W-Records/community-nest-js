import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';


@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  // 根据id删除房屋
  @Post('removeHouse/:id') 
  removeHouse(@Param('id') id) {
    return this.houseService.removeHouse(id);
  }




  // 根据id获取指定房屋信息
  @Get('findHouseById/:id') 
  findHouseById(@Param('id') id) {
    return this.houseService.findHouseById(id);
  }


  // 根据id修改房屋信息
  @Post('updateHouse') 
  updateHouse(@Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.updateHouse(updateHouseDto);
  }

  // 根据房屋id 移除房屋的用户信息
  @Post('removeUser/:houseId') 
  removeUser(@Param('houseId') houseId) {
    return this.houseService.removeUser(houseId);
  }



  // 为用户分配房屋
  @Post('assignHouse') 
  assignHouse(@Body() assignHouseDto: any) {
    return this.houseService.assignHouse(assignHouseDto);
  }




  @Post()
  create(@Body() createHouseDto: CreateHouseDto) {
    console.log(createHouseDto);
    return this.houseService.create(createHouseDto);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin') // 管理员接口
  @Get()
  findAll() {
    return this.houseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(+id, updateHouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseService.remove(+id);
  }
}
