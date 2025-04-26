import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillService {

  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
  ) {}




  // 查询用户的账单，状态为未缴费的账单
  async findUserBills(userid: number) {
    return this.billRepository.find({
      where: {
        userid,
        status: '未缴费',
      },
    });
  }


  // 根据账单id，修改账单的status字段为已缴费
  async updateBillStatus(id: number) {
    const bill = await this.billRepository.findOne({ where: { id } });
    if (!bill) {
      throw new Error('Bill not found');
    }
    bill.status = '已缴费';
    return this.billRepository.save(bill);
  }

  create(createBillDto: CreateBillDto) {
    
    return this.billRepository.save(createBillDto);
  }

  findAll() {
    
    return this.billRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  // 删除账单
  remove(id: number) {
    return this.billRepository.delete(id);;
  }
}
