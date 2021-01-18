// 定义http响应中间件，统一响应格式
import { Context } from 'koa';

export async function responseHandle(ctx: Context, next: nextProps) {
  if (ctx.result !== undefined) {
    ctx.type = 'json';
    ctx.body = {
      code: 0,
      data: ctx.result,
      message: 'success'
    };
  }
  await next();
}
