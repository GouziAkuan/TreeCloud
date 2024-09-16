import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersCreateDto, UserLoginDto, UpdateInfoDto } from './dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import {
  BadPasswordException,
  NoUserException,
  NoUsernameException,
  UserUpdateException,
} from './exception/user.exception';
import {
  UpdateInfoResponseDto,
  UserCreateResponseDto,
  UserInfoResponseDto,
  UserLoginResponseDto,
} from './dto/usersResponse.dto';
import { TokenService } from '../token/token.service';
import { PayloadDto } from '../token/dto/token.dto';

@Injectable()
export class UsersService {
  /**
   * 构造函数，用于依赖注入。
   * @param userRepository 注入的 UserEntity 仓库，用于与数据库进行交互。
   * @param configService 注入的 ConfigService，用于读取配置文件中的默认值。
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  // 创建新用户
  async create(userCreateData: UsersCreateDto): Promise<UserCreateResponseDto> {
    try {
      // 加密密码
      const hashedPassword: string = await bcrypt.hash(
        userCreateData.password,
        10,
      );
      // 如果用户未提供头像，则使用从配置文件中获取的默认头像 URL。
      await this.userRepository.insert({
        ...userCreateData,
        password: hashedPassword,
        avatar:
          userCreateData.avatar ||
          this.configService.get<string>('DEFAULT_AVATAR'),
        role: 'user',
      });

      // 返回包含状态、代码和消息的响应体。
      return {
        status: HttpStatus.OK, // 设置 HTTP 状态码为 201 OK。
        code: 0, // 状态码，通常用于业务逻辑中的成功标识。
        message: '注册成功', // 消息文本，表示注册成功。
      };
    } catch (error) {
      console.log(error);
    }
  }

  // 用户登录
  async login(userLoginData: UserLoginDto): Promise<UserLoginResponseDto> {
    // 从数据库中查找匹配的用户
    const userDatabase: any = await this.userRepository.findOne({
      where: {
        username: userLoginData.username,
      },
    });

    // 如果没有找到用户，抛出异常
    if (!userDatabase) {
      throw new NoUsernameException();
    } else {
      // 比较用户提供的密码与数据库中存储的加密密码
      const isMatch: boolean = await bcrypt.compare(
        userLoginData.password,
        userDatabase.password,
      );

      // 如果密码匹配，生成访问令牌和刷新令牌
      if (isMatch) {
        const payload: PayloadDto = {
          id: userDatabase.id,
          role: userDatabase.role,
        };

        // 生成访问令牌
        const accessToken = await this.tokenService.getAccessToken(payload);

        // 生成刷新令牌
        const refreshToken = await this.tokenService.getRefreshToken(payload);

        // 返回登录成功的响应
        return {
          status: HttpStatus.OK,
          code: 0,
          message: '登录成功',
          data: {
            username: userDatabase.username,
            avatar: userDatabase.avatar,
            phone: userDatabase.phone,
            accessToken,
            refreshToken,
          },
        };
      } else {
        // 如果密码不匹配，抛出异常
        throw new BadPasswordException();
      }
    }
  }

  // 查询用户信息
  async getUserInfo(id: number): Promise<UserInfoResponseDto> {
    // 数据库查找用户信息
    const userInfo: any = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    // 如果没有找到用户，抛出异常
    if (!userInfo) {
      throw new NoUserException();
    } else {
      return {
        status: HttpStatus.OK,
        code: 0,
        message: '查询成功',
        data: {
          username: userInfo.username,
          avatar: userInfo.avatar,
          phone: userInfo.phone,
        },
      };
    }
  }

  // 修改用户信息
  async updateInfo(
    id: number,
    userUpdateData: UpdateInfoDto,
  ): Promise<UpdateInfoResponseDto> {
    // 根据用户 ID使用更新数据更新用户信息
    const result: any = await this.userRepository.update(
      {
        id: id,
      },
      {
        username: userUpdateData.username,
        avatar: userUpdateData.avatar,
        phone: userUpdateData.phone,
      },
    );
    // 如果没有任何记录被更新，抛出更新异常
    if (result.affected === 0) {
      throw new UserUpdateException();
    }
    return {
      status: HttpStatus.OK,
      code: 0,
      message: '修改成功',
    };
  }
}
