import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  BadAccessTokenException,
  NoAccessTokenException,
} from 'src/modules/token/exception/token.exception';
import { BadAdminException } from '../exception/admin.exception';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 从HTTP请求中获取请求对象
    const request = context.switchToHttp().getRequest();
    // 从请求头中提取Authorization信息
    const authHeader = request.headers.authorization;

    // 如果没有提取到令牌，抛出异常
    if (!authHeader) {
      throw new NoAccessTokenException();
    }

    // 从Authorization头中提取JWT令牌
    const accessToken = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    try {
      // 使用JWT服务验证令牌，并将解码后的信息赋值进行角色判断
      const decoded = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get('JWT_SECRET'),
      });
      if (decoded.role === 'admin') {
        return true;
      } else {
        throw new BadAdminException();
      }
    } catch (error) {
      throw new BadAccessTokenException();
    }
  }
}
