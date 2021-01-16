## koa2+ts 快速 web 服务器

### 文件结构

```
├── bin
│   └── www.ts // 启动应用
├── logs // 存放日志
├── src
│   ├── app
│   │   ├── components // 控制器组件
│   │   │   ├── account
│   │   │   │   ├── account.controller.ts
│   │   │   │   └── account.service.ts
│   │   │   └── user
│   │   │       ├── user.controller.ts
│   │   │       └── user.service.ts
│   │   ├── constants // 常量
│   │   │   └── index.ts
│   │   ├── core // 一些核心类或全局引用的方法
│   │   │   ├── error.ts
│   │   │   └── logger.ts
│   │   ├── database // 数据库连接
│   │   │   └── index.ts
│   │   ├── entities // 实体
│   │   │   └── user
│   │   │       ├── user.entity.ts
│   │   │       └── user.model.ts
│   │   ├── middleware // 中间件
│   │   │   ├── error.middleware.ts
│   │   │   ├── jwt.middleware.ts
│   │   │   ├── logger.middleware.ts
│   │   │   └── response.middleware.ts
│   │   └── utils // 工具函数
│   │   │   └── crypto.ts
│   │	└── app.ts // 应用启动类
│   └── environments  // 多环境配置
│       ├── env.dev.ts
│       ├── env.prop.ts
│       └── index.ts
├── nodemon.json // nodemon 配置， watch ts文件
├── package-lock.json
├── package.json
├── tsconfig.json
├── .prettierrc.json //格式化配置
├── types //自定义泛型文件
└── tslint.json
```
