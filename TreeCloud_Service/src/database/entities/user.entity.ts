import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { AdoptionsEntity } from './adoptions.entity';

/**
 * 用户实体类
 *
 * 该类表示系统中的用户，包括用户的基本信息和相关收养记录。
 * 使用ORM框架typeorm进行数据库映射。
 */
@Entity('users')
@Unique(['phone', 'username'])
export class UserEntity {
  /**
   * 用户ID
   *
   * 自增长的主键，用于唯一标识一个用户。
   */
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  // 身份 管理员or普通用户
  @Column({ type: 'varchar', length: 20 })
  role: string;

  /**
   * 用户头像链接
   *
   * 可为空，用于存储用户头像的URL。
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  /**
   * 用户手机号码
   *
   * 唯一字段，用于注册和登录验证。
   */
  @Column({ type: 'varchar', length: 20, unique: true })
  phone: string;

  /**
   * 用户名
   *
   * 唯一字段，用于注册和登录验证。
   */
  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  /**
   * 用户密码
   *
   * 存储用户加密后的密码，用于登录验证。
   */
  @Column({ type: 'varchar', length: 255 })
  password: string;

  /**
   * 用户创建时间
   *
   * 自动记录用户创建的时间戳。
   */
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  /**
   * 用户更新时间
   *
   * 自动记录用户信息最后一次更新的时间戳。
   */
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;

  /**
   * 用户的收养记录
   *
   * 一对多关系，一个用户可以有多个收养记录。
   */
  @OneToMany(() => AdoptionsEntity, (adoption) => adoption.user)
  adoptions: AdoptionsEntity[];
}
