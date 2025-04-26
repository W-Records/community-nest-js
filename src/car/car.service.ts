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

  // 根据前端传递的id，修改指定车位的name字段的值
  async updateCarport(updateCarDto) {
    const carport: any = await this.carRepository.findOne({ where: { id: updateCarDto.id } });
    carport.name = updateCarDto.name;
    return this.carRepository.save(carport);
  }


  // 根据传递的id删除车位信息
  async removeCarport(id: number) {
    return this.carRepository.delete(id);
  }


  // 根据传递得id，移除此车位的用户信息
  async removeUserId(id: number) {
    const carport: any = await this.carRepository.findOne({ where: { id: id } });
    carport.userid = null;
    carport.type = '普通车位';
    carport.atTime = null;
    return this.carRepository.save(carport);
  }

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
