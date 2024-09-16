import { HttpStatus, Injectable } from '@nestjs/common';
import {
  AdoptTreeNumberRequestDto,
  AdoptTreeRequestDto,
  GetTreeDetailRequestDto,
  GetTreeRequestDto,
  GetUserAdoptTreeDetailRequestDto,
  GetUserAdoptTreeRequestDto,
} from './dto/treeRequest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeEntity } from 'src/database/entities/trees.entity';
import { TreeImagesEntity } from 'src/database/entities/treeImages.entity';
import { AdoptionsEntity } from 'src/database/entities/adoptions.entity';
import { Repository } from 'typeorm';
import { AdoptTreeDto } from './dto/tree.dto';
import {
  BadAdoptException,
  BadGetUserAdoptTreeDetail,
  NoTreeException,
  NoTreeNumException,
} from './exception/tree.exception';
import { TreeTypeEntity } from 'src/database/entities/treeType.entity';

@Injectable()
export class TreeService {
  constructor(
    @InjectRepository(TreeEntity)
    private readonly treeRepository: Repository<TreeEntity>,
    @InjectRepository(TreeImagesEntity)
    private readonly treeImagesRepository: Repository<TreeImagesEntity>,
    @InjectRepository(AdoptionsEntity)
    private readonly adoptionsRepository: Repository<AdoptionsEntity>,
    @InjectRepository(TreeTypeEntity)
    private readonly treeTypeRepository: Repository<TreeTypeEntity>,
  ) {}
  // 获取树木列表
  async getTree(): Promise<GetTreeRequestDto> {
    try {
      // 从数据库获取全部树信息
      const tree = await this.treeTypeRepository.find();
      tree.map((item) => {
        delete item.common_name;
        delete item.description;
      });
      return {
        status: HttpStatus.OK,
        code: 0,
        message: '获取成功',
        data: tree,
      };
    } catch (error) {
      console.log(error);
      throw new NoTreeException();
    }
  }

  // 获取某树木详情信息
  async getTreeDetail(treeTypeID: number): Promise<GetTreeDetailRequestDto> {
    try {
      // 在树木种类表查找对应的信息
      const tree: any = await this.treeTypeRepository.findOne({
        where: {
          id: treeTypeID,
        },
      });
      return {
        status: HttpStatus.OK,
        code: 0,
        message: '获取成功',
        data: {
          ...tree,
        },
      };
    } catch (error) {
      console.log(error);
      throw new NoTreeException();
    }
  }

  // 领养树木
  async adoptTree(
    adoptInfo: AdoptTreeDto,
    userId: number,
  ): Promise<AdoptTreeRequestDto> {
    // 养树木数量处理
    const adoptionTreeInfo: AdoptTreeNumberRequestDto =
      await this.adoptTreeNumber(adoptInfo.treeTypeID);
    // 生成独特的领养编号
    const adoptionID = await this.getAdoptionsID(adoptionTreeInfo);
    // 插入领养信息
    try {
      await this.adoptionsRepository.insert({
        nickname: adoptInfo.nickName,
        tree_type: adoptInfo.treeType,
        wish: adoptInfo.wish,
        adoption_id: adoptionID,
        user: { id: userId },
        tree: { id: adoptionTreeInfo.treeId },
        type_id: { id: adoptInfo.treeTypeID },
      });
    } catch (error) {
      console.log(error);
      throw new BadAdoptException();
    }

    return {
      status: HttpStatus.OK,
      code: 0,
      message: '领养成功',
      data: {
        adoptionID,
        nickName: adoptInfo.nickName,
        treeType: adoptInfo.treeType,
      },
    };
  }

  // 生成独特的领养编号
  async getAdoptionsID(
    adoptionNum: AdoptTreeNumberRequestDto,
  ): Promise<string> {
    try {
      // padStart 方法接收两个参数：targetLength: 期望的字符串总长度。padString: 用来填充字符串的字符串，默认为 ' '（空格）
      // 年
      const year: string = String(new Date().getFullYear());
      // 月
      const month: string = String(new Date().getMonth() + 1).padStart(2, '0'); //09
      // 日
      const day: string = String(new Date().getDay()).padStart(2, '0'); //07
      // 小时
      const hour: string = String(new Date().getHours()).padStart(2, '0');
      // 分钟
      const minute: string = String(new Date().getMinutes()).padStart(2, '0');
      // 秒
      const second: string = String(new Date().getSeconds()).padStart(2, '0');
      const num: string = String(adoptionNum.total - adoptionNum.remaining);
      const adoptionID: string =
        year + month + day + hour + minute + second + num;
      return adoptionID;
    } catch (error) {
      console.log(error);
      throw new NoTreeException();
    }
  }

  // 领养树木数量处理（实现将树isAdopted字段为true，treeType表更新）
  async adoptTreeNumber(
    treeTypeID: number,
  ): Promise<AdoptTreeNumberRequestDto> {
    // 验证数量是否够领取
    const tree: any = await this.treeTypeRepository.findOne({
      where: {
        id: treeTypeID,
      },
    });
    if (tree.remaining !== 0) {
      // 从tree表找到type_id=treeId的树，并且isAdopted字段为false的信息，随机选取一个标为true并更新
      const availableTree = await this.treeRepository.findOne({
        where: {
          type_id: { id: treeTypeID },
          isAdopted: false,
        },
      });
      await this.treeRepository.update(
        { id: availableTree.id },
        {
          isAdopted: true,
        },
      );
      // 领养树木数量减一
      tree.remaining -= 1;
      // 更新treetype表
      await this.treeTypeRepository.update(
        { id: treeTypeID },
        {
          remaining: tree.remaining,
        },
      );
      return {
        treeId: availableTree.id,
        total: tree.total,
        remaining: tree.remaining,
      };
    } else {
      throw new NoTreeNumException();
    }
  }

  // 获取用户领养树木信息
  async getUserTree(userId: number): Promise<GetUserAdoptTreeRequestDto> {
    // 在领养表查找全部领养信息，并且通过外键tree_id拿到每个记录对应的树信息
    const adoptions: any = await this.adoptionsRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['tree', 'tree.type_id'], // 显示 外键 tree 相关字段
    });
    // 处理adoptions
    const data = adoptions.map((item: any) => {
      const { id, tree_type } = item;
      const { avatar, scientific_name } = item.tree.type_id;
      // 返回处理后的对象
      return {
        id,
        tree_type,
        avatar,
        scientific_name,
      };
    });
    return {
      status: HttpStatus.OK,
      code: 0,
      message: '获取成功',
      data,
    };
  }

  // 获取用户领养树木详情
  async getUserTreeDetail(
    id: number,
  ): Promise<GetUserAdoptTreeDetailRequestDto> {
    try {
      // 在领养表通过记录id和用户id拿到对应的用户领养记录信息，并且通过外键tree_id拿到每个记录对应的树信息
      const adoptions: any = await this.adoptionsRepository.findOne({
        where: {
          id,
        },
        relations: ['tree', 'tree.type_id'],
      });
      // 根据拿到的tree表的id去拿treeimage表的详情图片
      const detailImage = await this.treeImagesRepository.find({
        where: {
          tree: { id: adoptions.tree.id },
        },
      });
      // 删除字段
      delete adoptions.updated_at;
      // 处理adoptions.tree.type_id
      const treeInfo = adoptions.tree.type_id;
      delete treeInfo.created_at;
      delete treeInfo.updated_at;
      delete adoptions.tree;
      // 处理data
      const data = {
        ...adoptions,
        ...treeInfo,
        detailImage: detailImage.map((item) => item.detailImage),
      };
      return {
        status: HttpStatus.OK,
        code: 0,
        message: '获取成功',
        data,
      };
    } catch (error) {
      console.log(error);
      throw new BadGetUserAdoptTreeDetail();
    }
  }
}
