// logger.ts 具体配置自行查看log4js 文档
import { configure, getLogger } from 'log4js';
import { resolve } from 'path';
import { Context } from 'koa';

const logPath = resolve(__dirname, '../../../logs'); // log存放路径，确保该路径存在

configure({
  appenders: {
    console: { type: 'console' },
    dateFile: {
      type: 'dateFile',
      filename: `${logPath}/log.log`,
      pattern: 'yyyy-MM-dd',
      compress: false, // compress 为 true，记录当天日志时，会对以往的老日志进行压缩操作，压缩文件后缀为 .gz (默认 : false)
      alwaysIncludePattern: true, // 当为 true 时，log 文件名会包含之前设置的 pattern 信息 (默认为 false，但是强烈建议开启)
      daysToKeep: 0, // 指定日志保留的天数 ( 默认为 0，始终保留 )
      keepFileExt: true // 是否保持日志文件后缀名
    }
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'info'
    },
    mysql: {
      appenders: ['console', 'dateFile'],
      level: 'info'
    }
  }
});

export const logger = getLogger('default');
export const mysqlLogger = getLogger('mysql');

export function logText(ctx: Context, ms: number) {
  const remoteAddress =
    ctx.headers['x-forwarded-for'] ||
    ctx.ip ||
    ctx.ips ||
    (ctx.socket && ctx.socket.remoteAddress);
  return `${ctx.method} ${ctx.status} ${ctx.url} - ${remoteAddress} - ${ms}ms`;
}
