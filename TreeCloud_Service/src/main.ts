// 导入Nest核心库中的NestFactory用于创建Nest应用实例
import { NestFactory } from '@nestjs/core';
// 导入应用模块，这是Nest应用的根模块，包含应用的主要配置
import { AppModule } from './app.module';

/**
 * 应用启动函数
 * 负责创建Nest应用实例并监听指定端口
 * 使用Express作为底层的HTTP服务器
 */
async function bootstrap() {
  // 创建Nest应用实例，使用AppModule作为根模块，使用默认的Express作为HTTP服务器
  const app = await NestFactory.create(AppModule);

  // 启动应用并监听8080端口，使应用可以接受来自网络的请求
  await app.listen(8080);
}

// 调用bootstrap函数以启动应用
bootstrap();
