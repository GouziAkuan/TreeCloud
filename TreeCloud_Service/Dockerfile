# Step 1: 使用 Node.js 的官方镜像作为基础镜像
FROM node:18-alpine

# Step 2: 设置工作目录
WORKDIR /app

# Step 3: 将 package.json 和 package-lock.json 复制到容器中
COPY package*.json ./

# Step 4: 安装依赖
RUN npm install --production

# Step 5: 复制项目的源代码到容器中，包括 .env 文件
COPY . .

# Step 6: 编译 TypeScript 为 JavaScript（如果是使用 TypeScript）
RUN npm run build

# Step 7: 暴露应用的端口
EXPOSE 8080

# Step 8: 启动应用，Nest 会自动加载 .env 文件
CMD ["npm", "run", "start:prod"]

# 给执行文件增加权限
RUN chmod +x /app/path/to/nest

RUN npm install --omit=dev