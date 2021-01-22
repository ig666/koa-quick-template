import { Context } from 'koa';
import { Post, Controller, Get } from 'koa-route-decors';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
import { AccountService } from '../service/account.service';

@Controller()
export class AccountController {
  constructor(private accountService: AccountService) {}
  @Post()
  async register(ctx: Context, next: () => nextProps) {
    const { username, password, nickname } = ctx.request.body;
    const result = await this.accountService.insert(
      username,
      password,
      nickname
    );
    ctx.result = {
      id: result.id,
      username: result.username,
      nickname: result.nickname
    };
    await next();
  }

  @Post()
  async login(ctx: Context, next: () => nextProps) {
    const { username, password } = ctx.request.body;
    // 验证密码并生成token
    const user = await this.accountService.verifyPassword(username, password);
    const token = jwt.sign(
      { username: user.username, id: user.id },
      JWT_SECRET,
      { expiresIn: '30d' }
    );
    ctx.result = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      token
    };
    await next();
  }

  @Get()
  async getListBypage(ctx: Context, next: () => nextProps) {
    const { username, pageSize, pageIndex } = ctx.query;
    const data = await this.accountService.getListBypage(
      username,
      pageIndex,
      pageSize
    );
    ctx.result = data;
    await next();
  }
}
