import { UserModel } from '../dao/user.dao';
import { CustomError } from '../core/error';
import { User } from '../entities/user.entity';
import { cryptoPassword } from '../utils/crypot';
import { Injectable } from 'koa-route-decors';

@Injectable()
export class AccountService {
  constructor(private userModel: UserModel) { }

  async insert(username: string, password: string, nickname: string) {
    const exist = await this.userModel.findByUsername(username);
    if (exist) {
      throw new CustomError(-1, '用户已存在');
    }
    const user = new User();
    user.username = username;
    user.password = cryptoPassword(password, username);
    user.nickname = nickname;
    const result = await this.userModel.create(user);
    return result;
  }

  async verifyPassword(username: string, password: string) {
    const user = await this.userModel.findAndCheckPassword(username, password);
    if (user) {
      return user;
    } else {
      throw new CustomError(-1, '用户名或密码错误');
    }
  }

  async getListBypage(username: string, pageIndex: number=1, pageSize: number=10) {
    const data = await this.userModel.getListBypage(username, pageIndex, pageSize);
    return data;
  }
}
