// 定义logger中间件，记录http请求日志
import { Context } from 'koa';
import { logText, logger } from '../core/logger';

export async function loggerHandle(ctx: Context, next: nextProps) {
  const satrt = Date.now();
  await next();
  const end = Date.now();
  const ms = end - satrt;
  const log = logText(ctx, ms);
  logger.info(log);
}
