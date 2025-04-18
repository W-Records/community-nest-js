import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  // 根据id修改用户信息
  async updateUserMsg(updateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: updateUserDto.id } });
    if (!user) {
      throw new Error('User not found');
    }
    // 更新用户信息
    user.password = updateUserDto.password;
    if (updateUserDto.phone != null) {
      user.phone = updateUserDto.phone;
    }
    return await this.userRepository.save(user);
  }



  // 获取当前用户信息
  async getCurrentUser(userId: number) { 
    // const user = await this.userRepository.findOne({ where: { id: userId } });
    // if (!user) {
    //   throw new Error('User not found');
    // }
    // return user;

    let res: any;
    res = await this.userRepository.manager.query(`
    SELECT
    u.*,
    GROUP_CONCAT(
			DISTINCT CONCAT(
                'ID:', h.id, 
								'; name:', h.name, 
								'; area:', h.area, 
								'; type:', h.type, 
								'; roomNumber:', h.roomNumber, 
								'; atTime:', COALESCE(DATE_FORMAT(h.atTime, '%Y-%m-%d'), '无到期时间')
            ) 
			SEPARATOR '|'
		) AS house_msg,
    GROUP_CONCAT(
			DISTINCT CONCAT(
                'ID:', c.id, 
								'; name:', c.name, 
								'; type:', c.type, 
								'; atTime:', COALESCE(DATE_FORMAT(c.atTime, '%Y-%m-%d'), '无到期时间')
            ) 
			SEPARATOR '|'
		) AS carport_msg
    FROM user u
    LEFT JOIN house h ON u.id = h.userid  
    LEFT JOIN carport c ON u.id = c.userid
    WHERE u.id = ?
    GROUP BY u.id;
    `,
    [userId]
    )
    console.log("用户多表查询，房屋信息和车位信息");
    console.log(res); 

    res = res.map(user => {
      const houseKeys = ['ID', 'name', 'area', 'type', 'roomNumber', 'atTime'];
      const carportKeys = ['ID', 'name', 'type', 'atTime'];

      return {
        ...user,
        house_msgs: this.parseMessage(user.house_msg, houseKeys),
        carport_msgs: this.parseMessage(user.carport_msg, carportKeys),
      };
    });

    console.log("转后后的----用户多表查询，房屋信息和车位信息");
    console.log(res); 

    return res;


  }




  // 修改用户得权限字段
  async updateUserRoles(userId: number, roles: string[]) {
    const user: any = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    user.roles = roles;
    return await this.userRepository.save(user);
  }


  // 创建用户
  // Partial<User> 允许传入的对象仅包含部分属性（例如只传 name 和 email，不强制传 id）
  async createUser(user: Partial<User>): Promise<User> {
    return await this.userRepository.save(user);
  }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    // return this.userRepository.find();
    let res: any;
    res = await this.userRepository.query(`
    SELECT
    u.*,
    GROUP_CONCAT(
			DISTINCT CONCAT(
                'ID:', h.id, 
								'; name:', h.name, 
								'; area:', h.area, 
								'; type:', h.type, 
								'; roomNumber:', h.roomNumber, 
								'; atTime:', COALESCE(DATE_FORMAT(h.atTime, '%Y-%m-%d'), '无到期时间')
            ) 
			SEPARATOR '|'
		) AS house_msg,
    GROUP_CONCAT(
			DISTINCT CONCAT(
                'ID:', c.id, 
								'; name:', c.name, 
								'; type:', c.type, 
								'; atTime:', COALESCE(DATE_FORMAT(c.atTime, '%Y-%m-%d'), '无到期时间')
            ) 
			SEPARATOR '|'
		) AS carport_msg
    FROM user u
    LEFT JOIN house h ON u.id = h.userid  
    LEFT JOIN carport c ON u.id = c.userid
    GROUP BY u.id;
    `)
    console.log("用户多表查询，房屋信息和车位信息");
    console.log(res); 

    res = res.map(user => {
      const houseKeys = ['ID', 'name', 'area', 'type', 'roomNumber', 'atTime'];
      const carportKeys = ['ID', 'name', 'type', 'atTime'];

      return {
        ...user,
        house_msgs: this.parseMessage(user.house_msg, houseKeys),
        carport_msgs: this.parseMessage(user.carport_msg, carportKeys),
      };
    });

    console.log("转后后的----用户多表查询，房屋信息和车位信息");
    console.log(res); 

    return res;
  }

  // 修正后的解析函数
  private parseMessage(message: string | null, keys: string[]): any[] {
    if (!message) return [];
    
    return message.split('|').map(item => {
      const parts = item.split('; ').filter(part => part.trim() !== '');
      const obj: { [key: string]: string } = {};
      parts.forEach(part => {
        const [key, value] = part.split(':').map(s => s.trim());
        // 保留中文和字母数字
        const cleanedKey = key.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');
        obj[cleanedKey] = value;
      });
      return obj;
    });
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
