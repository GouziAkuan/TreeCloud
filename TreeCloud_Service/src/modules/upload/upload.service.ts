import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeleteResFile, UploadResDto } from './dto/uploadres.dto';
import {
  DeleteFileException,
  InvalidFileException,
  UploadSizeException,
} from './exception/upload.exception';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  /**
   * 处理文件上传，生成文件的访问路径。
   * @param file 上传的文件对象
   * @returns 返回一个包含文件信息和状态的对象
   */
  uploadFile(file: Express.Multer.File): UploadResDto {
    // 文件大于5mb抛出错误
    if (file.size > 5 * 1024 * 1024) {
      throw new UploadSizeException();
    } else {
      // 从配置服务中获取静态文件的 URL
      const staticFilesUrl: string = this.configService.get<string>('NEST_URL');
      // 从配置服务中获取静态文件的目录
      const staticFiles: string =
        this.configService.get<string>('STATIC_FILES');
      // 构建文件的完整 URL
      const fileUrl: string = `${staticFilesUrl}${staticFiles}/${file.filename}`;

      // 返回包含文件信息和状态的对象
      return {
        status: HttpStatus.OK, // 设置 HTTP 状态码为 200 OK
        code: 0, // 状态码，通常用于业务逻辑中的成功标识
        filename: file.filename, // 上传文件的原始文件名
        path: fileUrl, // 文件的完整访问路径
      };
    }
  }

  /**
   * 删除静态文件
   * @param fileUrl 文件的完整 URL
   * @returns 返回删除操作的状态
   */
  async deleteFile(fileUrl: string): Promise<DeleteResFile> {
    try {
      const mr = await this.deleteMethod(fileUrl);
      if (mr) {
        return {
          status: HttpStatus.OK,
          code: 1,
          message: '文件删除成功',
        };
      } else {
        return {
          status: HttpStatus.OK,
          code: 1,
          message: '响应成功，图片为默认图片，无需删除',
        };
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        // 文件不存在
        throw new InvalidFileException();
      } else {
        // 删除文件失败或其他错误
        throw new DeleteFileException();
      }
    }
  }

  // 抽离删除逻辑，为了其他模块更好调用
  async deleteMethod(fileUrl: string): Promise<boolean> {
    const mrtx = this.configService.get<string>('DEFAULT_AVATAR');
    const mrtree = this.configService.get<string>('DEFAULT_TREE_IMG');
    // 判断是否为默认图片
    if (fileUrl !== mrtx && fileUrl !== mrtree) {
      const fileName = fileUrl.split('/').pop();
      const staticFilesPath =
        this.configService.get<string>('STATIC_FILES_PATH');
      const filePath = join(staticFilesPath, fileName);
      // 使用 fs.promises.access 检查文件是否存在
      await fsPromises.access(filePath);

      // 文件存在，删除文件
      await fsPromises.unlink(filePath);
      return true;
    } else {
      return false;
    }
  }
}
