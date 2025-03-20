import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  // 创建用户
  // Partial<User> 允许传入的对象仅包含部分属性（例如只传 name 和 email，不强制传 id）
  async createUser(user: Partial<User>): Promise<User> {
    return await this.userRepository.save(user);
  }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user 我的追加内容 成功了HH`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
