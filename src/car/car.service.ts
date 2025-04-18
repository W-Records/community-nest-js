import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}




  // 获取车位信息，类型type不能为消防车位，车位不能被持有就是userid不能有值
  async getCarInfo() {
    return this.carRepository.manager.query(`SELECT * FROM carport WHERE type != '消防车位' AND userid IS NULL;`);
  }


  // 修改指定车位的信息，修改的字段包括type，atTime，userid
  async updateCarInfo(updateCarDto) {

    const carport: any = await this.carRepository.findOne({ where: { id: updateCarDto.id } });
    carport.type = updateCarDto.type;
    carport.atTime = updateCarDto.atTime;
    carport.userid = updateCarDto.userid;

    return this.carRepository.save(carport);
  }





  create(createCarDto: CreateCarDto) {
    // 插入到数据库
    return this.carRepository.save(createCarDto);
  }

  findAll() {
    // 查找数据库全部数据
    return this.carRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
