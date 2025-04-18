import { Request, Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  
  @UseGuards(AuthGuard('jwt'), RolesGuard) // 需要 JWT 认证和角色验证
  @Roles('user') // 普通用户可访问
  @Get('profile')
  getProfile() {
    return { message: '普通用户接口' };
  }

  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin') // 管理员接口
  @Get('admin')
  getAdminData() {
    return { message: '管理员接口' };
  }




  // 获取当前用户信息
  @UseGuards(AuthGuard('jwt'))
  @Get('/getCurrentUserMsg')
  async getCurrentUserMsg(@Request() req) {
    console.log(`UserController内的输出---req.user:${JSON.stringify(req.user)}`);
    return this.userService.getCurrentUser(req.user.id);
  }




  // 根据id修改用户信息
  @Patch('/updateUserMsg')
  async updateUserMsg(@Body() updateUser) {
    return this.userService.updateUserMsg(updateUser);
  }




  @Post('/save')
  async createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin') // 管理员接口
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
