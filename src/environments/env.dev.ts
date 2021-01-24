import { ConnectionOptions } from 'typeorm';

export const db: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'test',
  logging: true,
  maxQueryExecutionTime: 1000, // 查询超过1000ms自动记录日志
  synchronize: true,
  timezone: '+08:00',
  dateStrings: true,
  entities: ['src/**/*.entity.ts']
};
