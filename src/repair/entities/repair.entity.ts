import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'repair' }) // 表名与数据库表名一致
export class Repair {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      type: 'varchar',
      length: 255,
      nullable: false,
      comment: '报修内容', // 对应数据库注释
    })
    content: string;
  
    @Column({
      type: 'int',
      nullable: true,
    })
    userid: number | null;
  
    @Column({
      type: 'varchar',
      length: 255,
      nullable: true,
    })
    username: string | null;
  
    @Column({
      type: 'varchar',
      length: 255,
      nullable: true,
      comment: '是否报修成功', // 对应数据库注释
    })
    status: string | null;
  
    @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP', // 对应数据库默认值
      nullable: false,
    })
    createTime: Date;

}
