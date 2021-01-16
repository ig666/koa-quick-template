export const JWT_SECRET = 'qi.chen'; // jwt 秘钥
export const NO_AUTH_PATH = {
  path: [/\//, /\/register/, /\/login/] // 公共接口，jwt排除的路由
};
