import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule, // 集成Passport
    JwtModule.register({
      secret: 'your_jwt_secret', // 从环境变量读取密钥
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy, // 新增的本地策略
    RolesGuard,
  ],
})
export class AuthModule {}
