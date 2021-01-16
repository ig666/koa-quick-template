import {ConnectionOptions} from 'typeorm';

export const db: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  database: 'test',
  logging: true,
  timezone: '+08:00',
  dateStrings: true,
  entities: ['src/**/*.entity.js']
};
