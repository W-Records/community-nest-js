// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中提取Token
      ignoreExpiration: false, // 不忽略过期时间
      secretOrKey: 'your_jwt_secret', // 密钥
    });
  }

  async validate(payload: any) {

    console.log(`JwtStrategy内的输出---payload:${JSON.stringify(payload)}`);

    // 通过payload中的用户信息查询数据库（如用户ID）
    const user = await this.authService.validateUserByPayload(payload);

    console.log(`JwtStrategy内的输出---user:${JSON.stringify(user)}`);

    return user; // 返回的用户对象会被注入到请求的`user`属性中
  }
}