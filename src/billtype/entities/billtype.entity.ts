import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'billtype' }) // 数据库表名为 billtype
export class Billtype {

    @PrimaryGeneratedColumn('increment') // 自增主键
    id: number;

    @Column({ type: 'varchar', length: 255, comment: '账单名称' }) // varchar(255)
    name: string;

    @Column({ type: 'int', comment: '账单默认金额' }) // int 类型
    amount: number;

}
