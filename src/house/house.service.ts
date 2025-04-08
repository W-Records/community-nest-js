import { Injectable } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from './entities/house.entity';

@Injectable()
export class HouseService {

  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
  ) {}

  // 为用户分配房屋
  async assignHouse(assignHouseDto) {
    console.log(assignHouseDto);
    const house: any = await this.houseRepository.findOne({ where: { id: assignHouseDto.houseId } });
    if (!house) {
      throw new Error('House not found');
    }
    house.userid = assignHouseDto.userId;
    house.type = assignHouseDto.type;
    house.atTime = assignHouseDto.atTime;


    // 同时修改用户得权限字段 
    let setRoles = "user"
    await this.houseRepository.manager.query(
      `UPDATE user SET roles = ? WHERE id = ?`, // 反引号包裹表名，问号占位符
      [setRoles, assignHouseDto.userId]
    );



    return this.houseRepository.save(house);
  }



  create(createHouseDto: CreateHouseDto) {
    createHouseDto.type = '用户未选择';
    return this.houseRepository.save(createHouseDto);
  }

  findAll() {
    console.log(this.houseRepository.find());
    return this.houseRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} house`;
  }

  update(id: number, updateHouseDto: UpdateHouseDto) {
    return `This action updates a #${id} house`;
  }

  remove(id: number) {
    return `This action removes a #${id} house`;
  }
}
