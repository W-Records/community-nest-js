import { Injectable } from '@nestjs/common';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repair } from './entities/repair.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RepairService {

  constructor(
    @InjectRepository(Repair)
    private readonly repairRepository: Repository<Repair>,
  ) {}

  // 查询用户报修信息
  async findUserRepairs(userid): Promise<Repair[]> {
    return this.repairRepository.find({ where: { userid } });
  }


 
  create(createRepairDto: CreateRepairDto) {
    return this.repairRepository.save(createRepairDto);
  }

  findAll() {
    return this.repairRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} repair`;
  }

  update(id: number, updateRepairDto: UpdateRepairDto) {
    return `This action updates a #${id} repair`;
  }

  remove(id: number) {
    return `This action removes a #${id} repair`;
  }
}
