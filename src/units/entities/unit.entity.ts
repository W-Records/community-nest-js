import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('units') // 指定对应的数据库表名
export class Unit {

    @PrimaryGeneratedColumn('increment') // 自增主键
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false }) // 单元号（非空）
    name: string;

    @Column({ type: 'int', nullable: false, name: 'building_id' }) // 所属楼栋ID（非空）
    buildingId: number;

    @Column({ type: 'varchar', length: 255, nullable: true, name: 'buildingname' }) // 所属楼栋号（可空）
    buildingName: string;

    @Column({ type: 'varchar', length: 255, nullable: true, name: 'buildingtype' }) // 所属楼栋是否是电梯房（可空）
    buildingType: string;

}
