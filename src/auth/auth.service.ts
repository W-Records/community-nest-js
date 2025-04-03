import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity'; // 假设你有一个User实体

@Injectable()
export class AuthService {


  
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) {}

  // 用户登录成功后生成Token
  async login(user: User) {
    const payload = { sub: user.id, roles: user.roles }; // 将用户ID和角色存入payload
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 根据payload验证用户（可扩展到数据库查询）
  async validateUserByPayload(payload: any) {
    // 这里可以添加数据库查询逻辑，例如根据payload.sub（用户ID）获取用户信息
    return { id: payload.sub, roles: payload.roles };
  }



  // 验证登录的用户名密码可正确
  async validateUser(username, password) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      return null; // 用户不存在
    }
    if (user.password !== password) {
      return null; // 密码错误
    }

    return user;
    // return { id: username, roles: password };
  }









  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
