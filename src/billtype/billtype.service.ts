import { Injectable } from '@nestjs/common';
import { CreateBilltypeDto } from './dto/create-billtype.dto';
import { UpdateBilltypeDto } from './dto/update-billtype.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Billtype } from './entities/billtype.entity';

@Injectable()
export class BilltypeService {

  constructor(
    @InjectRepository(Billtype)
    private readonly BilltypeRepository: Repository<Billtype>,
  ) {}

  create(createBilltypeDto: CreateBilltypeDto) {
    // 插入数据库
    return this.BilltypeRepository.save(createBilltypeDto);
  }

  findAll() {
    // 查询数据库
    return this.BilltypeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} billtype`;
  }

  update(id: number, updateBilltypeDto: UpdateBilltypeDto) {
    return `This action updates a #${id} billtype`;
  }

  remove(id: number) {
    // 删除
    return this.BilltypeRepository.delete(id);
  }
}
