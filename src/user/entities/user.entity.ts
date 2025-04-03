import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn 
} from 'typeorm';

@Entity({ name: 'user' }) // 表名与数据库表名一致（user）
export class User {

  @PrimaryGeneratedColumn({ type: 'int' }) // 主键自增
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false, // NOT NULL
  })
  username: string;


  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;


  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  phone: string;


  @Column({
    type: 'varchar',
    length: 100,
    nullable: true, // 允许 NULL
    default: null, // 默认值 NULL
  })
  roles: string | null; 


  @CreateDateColumn({ type: 'timestamp' }) // 自动处理 createdAt
  createdAt: Date;












  // @PrimaryGeneratedColumn()
  // id: number;

  // @Column({ length: 50 })
  // username: string;

  // @Column({ length: 100 })
  // email: string;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // createdAt: Date;

  // roles 字段允许为空
  // @Column({ type: 'varchar', length: 100, nullable: true })
  // roles: string | null; // 类型改为 string | null
}
