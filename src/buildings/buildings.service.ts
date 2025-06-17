import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuildingsService {


  constructor(
    @InjectRepository(Building)
    private readonly BuildingRepository: Repository<Building>,
  ) {}

  create(createBuildingDto: CreateBuildingDto) {
    return this.BuildingRepository.save(createBuildingDto);
  }

  findAll() {
    return this.BuildingRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} building`;
  }

  update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return `This action updates a #${id} building`;
  }

  remove(id: number) {
    return this.BuildingRepository.delete(id);;
  }
}
