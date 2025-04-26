import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}


  // 查询用户的账单，状态为未缴费的账单
  @Get(':userid')
  findUserBills(@Param('userid') userid: string) {
    return this.billService.findUserBills(+userid);
  }


  // 根据账单id，修改账单的status字段为已缴费
  @Patch('updateBillStatus/:id')
  updateBillStatus(@Param('id') id: string) {
    return this.billService.updateBillStatus(+id);
  }

  @Post()
  create(@Body() createBillDto: CreateBillDto) {
    return this.billService.create(createBillDto);
  }

  @Get()
  findAll() {
    return this.billService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billService.update(+id, updateBillDto);
  }

  // 删除账单
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(+id);
  }
}
