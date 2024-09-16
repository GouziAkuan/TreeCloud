import {
  Controller,
  Delete,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResFile, UploadResDto } from './dto/uploadres.dto'; // 注意：这里的导入路径应为 upload.dto.ts
import { UploadService } from './upload.service';
import { deleteFileDto } from './dto/upload.dto';

@Controller('file')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  /**
   * 处理文件上传请求。
   * @param file 上传的文件对象
   * @returns 返回上传文件的信息
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 使用 FileInterceptor 处理文件上传
  uploadFile(@UploadedFile() file: Express.Multer.File): UploadResDto {
    // 调用 UploadService 的 uploadFile 方法处理文件，并返回处理结果
    return this.uploadService.uploadFile(file);
  }

  // 删除图片
  @Delete('delete')
  async deleteFile(@Query() fileUrl: deleteFileDto): Promise<DeleteResFile> {
    return await this.uploadService.deleteFile(fileUrl.fileUrl);
  }
}
