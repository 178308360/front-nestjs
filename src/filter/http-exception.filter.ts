/*
 * @Author: Y
 * @Date: 2021-12-22 22:27:37
 * @LastEditTime: 2021-12-23 17:14:21
 * @LastEditors: Y
 * @Description:
 */
/*
 * @Author: Y
 * @Date: 2021-12-17 23:56:58
 * @LastEditTime: 2021-12-22 22:10:46
 * @LastEditors: Y
 * @Description:"拦截错误的返回数据"
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Logger } from 'src/utils/log4js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  //ArgumentsHost 是传递给原始处理程序的参数的包装器
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const request = ctx.getRequest();
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码
    //返回的错误信息
    let errorResponse = {};
    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Internal Server Error' : 'Client Error'}`;

    if (process.env.NODE_ENV === undefined) {
      const debug = exception.stack;
      errorResponse = {
        message: message,
        code: -1,
        debug,
      };
    } else {
      errorResponse = {
        message: message,
        code: -1,
      };
    }
    //输出日志
    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
    //服务器错误
    if (status >= 500) {
      Logger.error(logFormat);
    } else {
      Logger.info(logFormat);
    }
    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
