## koa2+ts 快速 web 服务器

## typeorm插件

### 事务使用方式
```
    // 手动介入事务流程控制
    const connection = await getConnection();
    const queryRunner = await connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const val = await queryRunner.manager.insert<HomeWork>(
        HomeWork,
        homeWork
      );
      console.log(JSON.stringify(val), '插入的homeWork数据');
      for (let homeWorkPhoto of homeWork.homeWorkPhotos) {
        const val = await queryRunner.manager.insert<HomeWorkPhotos>(
          HomeWorkPhotos,
          homeWorkPhoto
        );
        console.log(JSON.stringify(val), '插入的homeWorkPhoto数据');
      }
      await queryRunner.commitTransaction();
      return '创建成功';
    } catch (err: any) {
      await queryRunner.rollbackTransaction(); // 失败进行事务回滚
      throw new CustomError(-1, err.message);
    }
    // 框架自动控制事务
    await getManager().transaction(async (entityManager: EntityManager) => {
      for (let homeWorkPhoto of homeWork.homeWorkPhotos) {
        const val = await entityManager.insert<HomeWorkPhotos>(
          HomeWorkPhotos,
          homeWorkPhoto
        );
        console.log(JSON.stringify(val), '插入的homeWorkPhoto数据');
      }
      const val = await entityManager.insert<HomeWork>(HomeWork, homeWork);
      console.log(JSON.stringify(val), '插入的homeWork数据');
    });
```
### 限制主表删除(RESTRICT)/关联删除(CASCADE)/主表删除，子表外键置空，相当于不关联删除(SET NULL)
```
tips:需要设置在一对多，多的那一边
@ManyToOne((type) => HomeWork, (homeWork) => homeWork.homeWorkPhotos,{onDelete: 'SET NULL'})
```

## joi 验证插件

```
1.忽略字段额外验证
const { error } = semesterSchema.validate(semester, { allowUnknown: true }); // 设置true，则允许对象包含被忽略的未知键。默认为false。推荐设置true

2.
目前只对最后一个验证规则使用了自定义消息

  phone: Joi.string()
    .required()
    .pattern(
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
    )
    .message('手机号格式错误'),
多个可以这样写:
const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .max(30)
      .required()
      .pattern(new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/))
      .message({"string.pattern.base":"Invalid username",
                "string.min":"minimum 2 character required",
                "string.max":"maximum 30 characters allowed"})
  });

  3.添加额外字段验证
      const { error } = semesterSchema
      .fork('id', (filed) => filed.required())
      .validate(semester);
  4.required().message('请输入作业内容')  //这种初始化要报错,妈的，目前找到解决办法就是跟error
     required().error(new Error('请输入作业内容'))
```

### 文件结构

```
├── bin
│   └── www.ts // 启动应用
├── logs // 存放日志
├── src
│   ├── app
│   │   ├── constants // 常量
│   │   │   └── index.ts
│   │   │
│   │   ├── controller // ui层(路由层)
│   │   │
│   │   ├── core // 一些核心类或全局引用的方法
│   │   │   ├── error.ts
│   │   │   └── logger.ts
│   │   │
│   │   ├── dao // 数据库交互层
│   │   │
│   │   ├── database // 数据库连接
│   │   │   └── index.ts
│   │   │
│   │   ├── entities // 实体
│   │   │
│   │   ├── middleware // 中间件
│   │   │   ├── error.middleware.ts
│   │   │   ├── jwt.middleware.ts
│   │   │   ├── logger.middleware.ts
│   │   │   └── response.middleware.ts
│   │   │
│   │   ├── service // 逻辑层
│   │   │
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
