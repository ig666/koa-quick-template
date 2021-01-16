import {ConnectionOptions} from 'typeorm';

export const db: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'test',
  logging: true,
  // synchronize: true,
  timezone: '+08:00',
  dateStrings: true,
  entities: ['src/**/*.entity.ts']
};
