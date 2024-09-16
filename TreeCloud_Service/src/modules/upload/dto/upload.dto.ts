import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

class deleteFileDto {
  @IsNotEmpty()
  @IsUrl()
  @IsString()
  fileUrl: string;
}

export { deleteFileDto };
