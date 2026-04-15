import { Logger, QueryRunner } from 'typeorm';
import { logger } from 'src/utils/logger';

export class TypeOrmLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    logger.info(`${query} -- ${JSON.stringify(parameters)}`, {
      context: 'DATABASE',
    });
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    logger.error(`${error} -- ${query} -- ${JSON.stringify(parameters)}`, {
      context: 'DATABASE',
    });
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    logger.warn(`SLOW QUERY (${time}ms): ${query}`, {
      context: 'DATABASE',
    });
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    logger.info(message, { context: 'DATABASE' });
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    logger.info(message, { context: 'DATABASE' });
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    if (level === 'warn') {
      logger.warn(message, { context: 'DATABASE' });
    } else {
      logger.info(message, { context: 'DATABASE' });
    }
  }
}