import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
export const db: ConnectionOptions = {
  type: 'mysql',
  host: 'your host',
  port: 3307,
  username: 'root',
  database: 'databaseName',
  logging: true,
  synchronize: true,
  timezone: '+08:00',
  dateStrings: true,
  entities: [path.resolve(__dirname, '../**/*.entity.js')]
};
