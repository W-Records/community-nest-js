import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'bill' })
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '缴费名'
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
    comment: '缴费值'
  })
  price: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  username: string | null;

  @Column({
    type: 'int',
    nullable: true
  })
  userid: number | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '缴费状态'
  })
  status: string | null;
}
