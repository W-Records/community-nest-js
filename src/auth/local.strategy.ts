// auth/local.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // 如果需要自定义配置，可以传递参数（如 { usernameField: 'email' }）
  }

  async validate(username: string, password: string): Promise<any> {

    console.log(`LocalStrategy内的输出---username: ${username}, password: ${password}`);

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user; // 返回的用户对象会被注入到 req.user
  }
}