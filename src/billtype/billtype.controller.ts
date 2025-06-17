import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BilltypeService } from './billtype.service';
import { CreateBilltypeDto } from './dto/create-billtype.dto';
import { UpdateBilltypeDto } from './dto/update-billtype.dto';

@Controller('billtype')
export class BilltypeController {
  constructor(private readonly billtypeService: BilltypeService) {}

  @Post()
  create(@Body() createBilltypeDto: CreateBilltypeDto) {
    return this.billtypeService.create(createBilltypeDto);
  }

  @Get()
  findAll() {
    return this.billtypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billtypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBilltypeDto: UpdateBilltypeDto) {
    return this.billtypeService.update(+id, updateBilltypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billtypeService.remove(+id);
  }
}
