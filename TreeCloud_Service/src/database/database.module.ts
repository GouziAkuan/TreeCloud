import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { TreeEntity } from './entities/trees.entity';
import { TreeImagesEntity } from './entities/treeImages.entity';
import { AdoptionsEntity } from './entities/adoptions.entity';
import AdminUserEntity from './entities/adminUser.entity';
import { TreeTypeEntity } from './entities/treeType.entity';

/**
 * 数据库模块，用于配置和初始化TypeORM以连接到数据库。
 * 该模块还导出TypeOrmModule，以便其他模块可以使用实体。
 */
@Module({
  imports: [
    /**
     * 配置TypeORM模块以异步方式初始化数据库连接。
     * 使用配置模块（ConfigModule）提供的配置服务（ConfigService）来动态获取数据库连接参数。
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        synchronize: true, // 在开发时可以使用，生产环境建议设为 false
        autoLoadEntities: true,
      }),
    }),
    /**
     * 注册实体模块，使得TypeORM可以管理这些实体。
     */
    TypeOrmModule.forFeature([
      UserEntity,
      TreeEntity,
      TreeImagesEntity,
      AdoptionsEntity,
      AdminUserEntity,
      TreeTypeEntity,
    ]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
