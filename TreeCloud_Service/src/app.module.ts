import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './modules/upload/upload.module';
import cors from 'cors';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { UsersModule } from './modules/users/users.module';
import { BasicExceptionsFilter } from './common/filters/basiceException.filter';
import { DatabaseExceptionFilter } from './common/filters/databaseException.filter ';
import { BadRequestExceptionFilter } from './common/filters/badRequestException.filter';
import { TokenModule } from './modules/token/token.module';
import { TreeModule } from './modules/tree/tree.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    // 配置模块，用于加载环境变量并全局使用
    ConfigModule.forRoot({ isGlobal: true }),

    // 导入自定义的数据库模块
    DatabaseModule,

    // 导入自定义的上传模块
    UploadModule,

    // 导入自定义的用户模块
    UsersModule,

    // 导入自定义的token模块
    TokenModule,

    TreeModule,

    AdminModule,

    // 配置 ServeStaticModule 以服务静态文件
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule], // 引入 ConfigModule 以便在 useFactory 中使用 ConfigService
      inject: [ConfigService], // 注入 ConfigService
      useFactory: async (configService: ConfigService) => [
        {
          // 配置静态文件的根目录
          rootPath: join(
            __dirname,
            '..',
            configService.get<string>('STATIC_FILES'),
          ),
          // 配置静态文件的访问前缀
          serveRoot: configService.get<string>('STATIC_FILES_PREFIX'),
        },
      ],
    }),
  ],
  controllers: [], // 当前模块中没有定义控制器
  providers: [
    // 全局异常过滤器
    {
      provide: APP_FILTER,
      useClass: BasicExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },

    // 全局验证管道
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      useValue: new ValidationPipe({
        whitelist: true, // 自动删除请求体中未被定义的属性
        forbidNonWhitelisted: true, // 对于请求体中包含未定义属性的请求返回 400 错误
        transform: true, // 自动将请求体数据转换为 DTO 类型
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 应用 CORS 中间件，允许跨域请求
    consumer
      .apply(
        cors({
          origin: true, // 允许所有来源的跨域请求
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          credentials: true,
        }),
      )
      .forRoutes('*');
  }
}
