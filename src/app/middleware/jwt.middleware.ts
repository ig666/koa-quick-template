// jwt中间件
import * as KoaJwt from 'koa-jwt';
import { JWT_SECRET, NO_AUTH_PATH } from '../constants';

export const jwt = KoaJwt({
  secret: JWT_SECRET
}).unless(NO_AUTH_PATH); // 排除不需要token验证的路由
