import { Module } from '@nestjs/common';
import { BilltypeService } from './billtype.service';
import { BilltypeController } from './billtype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billtype } from './entities/billtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billtype])],
  controllers: [BilltypeController],
  providers: [BilltypeService],
})
export class BilltypeModule {}
