import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import {
  AdoptTreeRequestDto,
  GetTreeDetailRequestDto,
  GetTreeRequestDto,
  GetUserAdoptTreeDetailRequestDto,
} from './dto/treeRequest.dto';
import { JwtAuthGuard } from 'src/common/guards/token.guard';
import { TreeService } from './tree.service';
import {
  AdoptTreeDto,
  GetTreeDetailDto,
  GetTreeTypeDetailDto,
} from './dto/tree.dto';

@Controller('tree')
@UseGuards(JwtAuthGuard)
export class TreeController {
  constructor(private readonly treeservice: TreeService) {}

  // 获取树木列表
  @Get('getTree')
  async getTree(): Promise<GetTreeRequestDto> {
    return await this.treeservice.getTree();
  }

  // 获取某树木详情信息
  @Get('getTreeDetail')
  async getTreeDetail(
    @Query() query: GetTreeTypeDetailDto,
  ): Promise<GetTreeDetailRequestDto> {
    return await this.treeservice.getTreeDetail(query.treeTypeID);
  }

  // 领养树木
  @Post('adoptTree')
  async adoptTree(
    @Body() body: AdoptTreeDto,
    @Request() req: any,
  ): Promise<AdoptTreeRequestDto> {
    return await this.treeservice.adoptTree(body, req.user.id);
  }

  // 获取用户领养树木列表
  @Get('getUserTree')
  async getUserTree(@Request() req: any): Promise<any> {
    return await this.treeservice.getUserTree(req.user.id);
  }

  // 获取用户领养树木详情
  @Get('getUserTreeDetail')
  async getUserTreeDetail(
    @Query() query: GetTreeDetailDto,
  ): Promise<GetUserAdoptTreeDetailRequestDto> {
    return await this.treeservice.getUserTreeDetail(query.adoptID);
  }
}
