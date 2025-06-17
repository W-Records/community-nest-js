import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'carport' })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '车位名称'
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '类型，比如短期还是长期'
  })
  type: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: '到期时间'
  })
  atTime: Date | null;

  @Column({
    type: 'int',
    nullable: true
  })
  userid: number | null;

  @Column({ type: 'varchar', length: 255, comment: '地上地下', nullable: true })
  updown: string;
}
