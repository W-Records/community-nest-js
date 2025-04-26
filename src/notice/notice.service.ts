import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {

  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}



  // 更新通知表的信息
  async updateNotice(updateNoticeDto) {
    const notice = await this.noticeRepository.findOne({ where: { id: updateNoticeDto.id } });
    if (!notice) {
      throw new Error('Notice not found');
    }
    // 更新通知信息
    notice.title = updateNoticeDto.title;
    notice.content = updateNoticeDto.content;
    return await this.noticeRepository.save(notice);
  }



  create(createNoticeDto: CreateNoticeDto) {
    return this.noticeRepository.save(createNoticeDto);
  }

  findAll() {
    return this.noticeRepository.find();
  }

  findOne(id: number) {
    // 根据id查询，指定通知信息
    return this.noticeRepository.findOne({ where: { id } });
  }

  update(id: number, updateNoticeDto: UpdateNoticeDto) {
    return `This action updates a #${id} notice`;
  }

  remove(id: number) {
    // 删除
    return this.noticeRepository.delete(id);
  }
}
