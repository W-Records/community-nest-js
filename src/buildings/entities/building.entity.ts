import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('buildings') // 指定对应的数据库表名
export class Building {
    @PrimaryGeneratedColumn('increment') // 自增主键
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false }) // 楼栋号（非空）
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true }) // 是否为电梯房（可空）
    type: string;
}
