// crypto.ts 密码加密
import * as Crypto from 'crypto';

export function cryptoPassword(pwd: string, key: string) {
  return Crypto.createHmac('sha256', key).update(pwd).digest('hex');
}
