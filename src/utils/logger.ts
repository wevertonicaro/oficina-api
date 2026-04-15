import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

const logDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const databaseFilter = winston.format((info) => {
  return info.context === 'DATABASE' ? info : false;
});

const databaseTransport = new winston.transports.File({
  filename: path.join(logDir, 'database.log'),
  format: winston.format.combine(
    databaseFilter(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}`;
    }),
  ),
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, context }) => {
      return `${timestamp} [${level}]${context ? ` [${context}]` : ''} ${message}`;
    }),
  ),
  transports: [
    new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
    }),

    databaseTransport,

    new winston.transports.File({
        filename: path.join(logDir, 'combined.log'),
    }),

    new winston.transports.Console(),
  ],
});