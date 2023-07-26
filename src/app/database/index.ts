import {
  ConnectionOptions,
  Logger,
  QueryRunner
} from 'typeorm';
import { environment } from '../../environments'; // 支持多环境自动导入不同配置,详见environments
import { mysqlLogger } from '../core/logger';

// 用我们自己的logger来接管typeorm logger
class DbLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    mysqlLogger.info(query);
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    mysqlLogger.error(query, error);
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    mysqlLogger.info(query, time);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    mysqlLogger.info(message);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    mysqlLogger.info(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case 'info': {
        mysqlLogger.info(message);
        break;
      }
      case 'warn': {
        mysqlLogger.warn(message);
      }
    }
  }
}

const config: ConnectionOptions = environment.db as any;

export const dbConfig = Object.assign(config, { logger: new DbLogger() });
