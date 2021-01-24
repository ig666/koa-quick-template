// user/user.model.ts 创建实体模型
import { User } from '../entities/user.entity';
import { getRepository, IsNull, Not, Repository } from 'typeorm';
import { cryptoPassword } from '../utils/crypot';
import { Injectable } from 'koa-route-decors'; // 导入Injectable装饰器，申明该类可被注入

@Injectable()
export class UserModel {
  private repository: Repository<User>;
  private select: (keyof User)[] = ['id', 'username', 'nickname', 'gender']; // 遍历User拿到实体键名

  constructor() {
    this.repository = getRepository(User);
  }

  async create(user: User) {
    const result = await this.repository.save(user);
    return result;
  }

  async findById(id: string) {
    const user = await this.repository.findOne(id, { select: this.select });
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.repository.findOne(
      { username },
      { select: this.select }
    );
    return user;
  }

  async findAndCheckPassword(username: string, password: string) {
    const user = await this.repository.findOne(
      { username, password: cryptoPassword(password, username) },
      { select: this.select }
    );
    return user;
  }

  async findAll() {
    const users = await this.repository.find({
      select: this.select
    });
    return users;
  }

  async getListBypage(username: string, pageIndex: number, pageSize: number) {
    let searchData = { username };
    searchData = JSON.parse(
      JSON.stringify(searchData, (key: any, value: any) => {
        if (!value) return undefined;
        return value;
      })
    ); // 过滤空字符串和null查询
    const count = await this.repository.count(searchData);
    const users = await this.repository.find({
      where: {
        ...searchData
      },
      skip: pageSize * (pageIndex - 1),
      take: pageSize,
      select: this.select
    });
    const data = {
      users,
      count
    };
    return data;
  }
}
