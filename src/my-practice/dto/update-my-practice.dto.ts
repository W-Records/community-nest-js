import { PartialType } from '@nestjs/mapped-types';
import { CreateMyPracticeDto } from './create-my-practice.dto';

export class UpdateMyPracticeDto extends PartialType(CreateMyPracticeDto) {}
