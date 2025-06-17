import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyPracticeModule } from './my-practice/my-practice.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HouseModule } from './house/house.module';
import { CarModule } from './car/car.module';
import { BillModule } from './bill/bill.module';
import { RepairModule } from './repair/repair.module';
import { NoticeModule } from './notice/notice.module';
import { BuildingsModule } from './buildings/buildings.module';
import { UnitsModule } from './units/units.module';
import { BilltypeModule } from './billtype/billtype.module';

@Module({
  imports: [
    MyPracticeModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // 开发环境可用，生产环境要关闭
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    HouseModule,
    CarModule,
    BillModule,
    RepairModule,
    NoticeModule,
    BuildingsModule,
    UnitsModule,
    BilltypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
