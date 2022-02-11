/*
 * @Author: Y
 * @Date: 2021-12-17 23:59:16
 * @LastEditTime: 2022-02-07 23:57:50
 * @LastEditors: Y
 * @Description:"拦截成功的返回数据"
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from '../utils/log4js';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  //转换从函数返回的结果
  //ExecutionContext 提供了更多功能，它扩展了 ArgumentsHost，但是也提供了有关当前执行过程的更多详细信息。
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((data) => {
        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        Request original url: ${req.originalUrl}
        Method: ${req.method}
        IP: ${req.ip}
        User: ${JSON.stringify(req.user)}
        Response data:\n ${JSON.stringify(data.data)}
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
        Logger.info(logFormat);
        Logger.access(logFormat);
        return {
          data: data.data,
          code: data.code,
          msg: data.msg,
        };
      }),
    );
  }
}
