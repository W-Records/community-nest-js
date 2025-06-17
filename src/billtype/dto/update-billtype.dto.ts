import { PartialType } from '@nestjs/mapped-types';
import { CreateBilltypeDto } from './create-billtype.dto';

export class UpdateBilltypeDto extends PartialType(CreateBilltypeDto) {}
