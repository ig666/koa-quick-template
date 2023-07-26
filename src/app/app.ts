// app.ts
import 'reflect-metadata';
import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as body from 'koa-body';
import * as staticService from 'koa-static';
import * as Router from 'koa-router';
import { autoRouter } from 'koa-route-decors';
import { loggerHandle } from './middleware/logger.middleware';
import { errorHandle } from './middleware/error.middleware';
import { responseHandle } from './middleware/response.middleware';
import { jwt } from './middleware/jwt.middleware';
import { resolve } from 'path';
import { dbConfig } from './database';
import { createConnection } from 'typeorm';
export class App {
  private app: Koa;
  constructor () {
    this.app = new Koa();
    this.init().catch((err) => console.log(err));
  }

  // 装配各种中间件
  private async init() {
    try {
      let result = await createConnection(dbConfig);
      console.log('数据库初始化成功');
    } catch (err) {
      console.log(err, '数据库初始化失败');
    } // 数据库链接 加载完成之后，路由初始化控制器才能找到具体实体
    const router = new Router();
    const subRouter = await autoRouter(resolve(__dirname, './')); // 默认引入该路径下controller.ts结尾路由;
    router.use(subRouter.routes()); // 路由添加jwt验证
    this.app
      .use(cors())
      .use(loggerHandle)
      .use(errorHandle)
      .use(
        body({
          multipart: true
        })
      )
      .use(jwt)
      .use(router.routes())
      .use(router.allowedMethods())
      .use(staticService(resolve(__dirname, '../../static')))
      .use(responseHandle);
  }

  start(port: number) {
    this.app.listen(port, () => {
      console.log('service is started', port);
    });
  }
}
