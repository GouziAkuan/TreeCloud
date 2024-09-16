/**
 * 上传文件的响应数据传输对象（DTO）。
 * 用于在文件上传成功后返回相关信息。
 */
interface UploadResDto {
  /**
   * HTTP 状态码，表示请求处理的结果。
   * 例如，200 表示成功，400 表示请求错误等。
   */
  status: number;

  /**
   * 业务逻辑中的状态码，用于标识操作的结果。
   * 例如，0 表示成功，非0 值可能表示不同类型的错误。
   */
  code: number;

  /**
   * 上传文件的原始文件名。
   * 例如，`'image-20240723.png'`。
   */
  filename: string;

  /**
   * 文件的完整访问路径。
   * 用于客户端获取上传文件的 URL。
   * 例如，`'http://localhost:8080/static/images/image-20240723.png'`。
   */
  path: string;
}

interface DeleteResFile {
  status: number;
  code: number;
  message: string;
}

export { UploadResDto, DeleteResFile };
