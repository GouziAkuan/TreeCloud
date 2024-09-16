// 创建token
interface PayloadDto {
  id: number;
  role: string;
}

// token解析后
interface ParseTokenDto {
  id: number;
  role: string;
  iat: number;
  exp: number;
}

export { PayloadDto, ParseTokenDto };
