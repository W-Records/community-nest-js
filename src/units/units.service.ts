import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitsService {

  constructor(
    @InjectRepository(Unit)
    private readonly UnitRepository: Repository<Unit>,
  ) {}


  create(createUnitDto: CreateUnitDto) {
    return this.UnitRepository.save(createUnitDto);
  }

  findAll() {
    return this.UnitRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} unit`;
  }

  update(id: number, updateUnitDto: UpdateUnitDto) {
    return `This action updates a #${id} unit`;
  }

  remove(id: number) {
    return this.UnitRepository.delete(id);
  }
}
