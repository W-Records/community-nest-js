// auth/local.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // 如果需要自定义配置，可以传递参数（如 { usernameField: 'email' }）
  }

  async validate(username: string, password: string): Promise<any> {

    console.log(`LocalStrategy内的输出---username: ${username}, password: ${password}`);

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      // 自定义异常信息
      throw new UnauthorizedException('用户不存在 或 密码错误');
      // throw new Error('Invalid credentials阿斯顿发射点');
    }
    return user; // 返回的用户对象会被注入到 req.user
  }
}