// auth/roles.guard.ts
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './roles.decorator'; // 后面会定义这个装饰器
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // 无角色要求则放行
    }

    const { user } = context.switchToHttp().getRequest(); // 从 Passport 的验证结果中获取用户信息

    if (!user || !user.roles) {
      throw new ForbiddenException('无权限访问');
    }

    // 关键修改：强制转换 user.roles 为数组
    const roles = Array.isArray(user.roles) ? user.roles : [user.roles]; // 如果不是数组，包装成数组

    // 检查用户是否包含至少一个所需角色
    const hasRole = roles.some((role) => requiredRoles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('权限不足');
    }

    return true;
  }
}