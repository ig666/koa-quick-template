import { Context } from 'koa';
import { logger } from '../core/logger';
export async function errorHandle(ctx: Context, next: () => Promise<any>) {
  try {
    await next();
  } catch (err) {
    if (!err.code) {
      logger.error(err.stack);
    }
    ctx.body = {
      code: err.code || -1,
      message: err.message.trim()
    };
    ctx.status = 200; // 状态码200让前端不报错
  }
}
