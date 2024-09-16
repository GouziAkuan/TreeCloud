# TreeCloud 服务端

这是一个基于 Nest.js、TypeORM、MySQL 和 TypeScript 开发的云端林场服务端。

## 技术栈

- **后端**: Nest.js + TypeORM + MySQL + TypeScript

## 推荐的 IDE 配置

使用 [VSCode](https://code.visualstudio.com/) + [NestJS 插件](https://marketplace.visualstudio.com/items?itemName=nestjsx.nestjs)。

## 项目搭建

```sh
npm install
```

````

### 启动开发服务器

```sh
npm run start:dev
```

### 构建并启动生产环境

```sh
npm run build
npm start
```

## 配置环境变量

### 修改 `.env` 文件

在项目根目录修改 `.env` 文件（.env有配置对应的注释如数据库等）：

### 数据库连接

确保MYSQL数据库配置正确，如数据库用户名、密码、数据库名等。
导入treecloud.sql文件到数据库中
启动项目即可

## 项目描述

**TreeCloud 服务端** 是云端林场的核心后端部分，负责处理来自前端和小程序端的所有请求。服务端实现了用户认证、树木管理、养护记录等功能，并通过 RESTful API 提供服务。

### 主要功能

- **用户认证**：支持用户注册、登录、退出等操作。
- **树木管理**：支持添加、编辑和删除树木信息。
- **养护记录**：记录和更新树木的养护状态。
- **API 接口**：提供一系列 RESTful API 供前端和小程序端调用。

---

感谢您的支持！让我们携手共创美好未来！

---

**GouziAkuan敬上**
````
