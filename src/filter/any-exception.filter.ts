/*
 * @Author: Y
 * @Date: 2021-12-23 21:15:40
 * @LastEditTime: 2022-01-26 13:42:13
 * @LastEditors: Y
 * @Description:
 */
/**
 * 捕获所有异常
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '../utils/log4js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
     Request original url: ${request.originalUrl}
     Method: ${request.method}
     IP: ${request.ip}
     Status code: ${status}
     Response: ${exception.stack} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
     `;
    Logger.error(logFormat);
    if (process.env.NODE_ENV === undefined) {
      response.status(status).json({
        code: status,
        debug: exception.stack,
      });
    } else {
      response.status(status).json({
        code: status,
        msg: `Service Error`,
      });
    }
  }
}
