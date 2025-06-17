import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'house' })
export class House {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string; // 房屋名称
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    area: string; // 房屋面积
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    type: string; // 房屋类型（长期持有/短租）
  
    @Column({ type: 'timestamp', nullable: true })
    atTime: Date | null; // 到期时间
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    roomNumber: string; // 房间号
  
    @Column({ type: 'int', nullable: true })
    userid: number | null; // 用户ID

    @Column({ type: 'varchar', length: 255, nullable: true }) // 是否为电梯房（可空）
    elevator: string;

    @Column({ type: 'varchar', length: 255, nullable: true }) // 所属楼栋单元（可空）
    address: string;
}
