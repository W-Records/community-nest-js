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

  // 根据前端转递的id，修改status字段为已处理
  async updateStatus(id: number): Promise<Repair> {
    const repair = await this.repairRepository.findOne({ where: { id } });
    if (!repair) {
      throw new Error('Repair not found');
    }
    repair.status = '已处理';
    return this.repairRepository.save(repair);
  }

  // 查询用户报修信息
  async findUserRepairs(userid): Promise<Repair[]> {
    return this.repairRepository.find({ where: { userid } });
  }


 
  create(createRepairDto: CreateRepairDto) {
    return this.repairRepository.save(createRepairDto);
  }

  findAll() {
    // 自定义SQL语句，SELECT r.*, u.phone, h.address, h.roomNumber
    // FROM repair r
    // LEFT JOIN user u
    // ON r.userid = u.id
    // JOIN house h
    // ON h.userid = r.userid
    return this.repairRepository.manager.query(`
    SELECT r.*, u.phone, h.address, h.roomNumber
    FROM repair r
    LEFT JOIN user u
    ON r.userid = u.id
    JOIN house h
    ON h.userid = r.userid
    `);
  }

  findOne(id: number) {
    return `This action returns a #${id} repair`;
  }

  update(id: number, updateRepairDto: UpdateRepairDto) {
    return `This action updates a #${id} repair`;
  }

  remove(id: number) {
    // 删除
    return this.repairRepository.delete(id);
  }
}
