/*
 * @Author: Y
 * @Date: 2021-12-23 21:30:47
 * @LastEditTime: 2021-12-23 22:12:17
 * @LastEditors: Y
 * @Description:"同账号的登录挤出"
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RedisInstance } from 'src/utils/redis';

@Injectable()
export class TokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 获取请求头里的 token
    const authorization = request['headers'].authorization || void 0;
    const token = authorization.split(' ')[1]; // authorization: Bearer xxx

    // 获取 redis 里缓存的 token
    const redis = await RedisInstance.initRedis('TokenGuard.canActivate', 0);
    const key = user.id + '-' + user.username;
    const cache = await redis.get(key);
    console.log(cache);
    if (token !== cache) {
      // 如果 token 不匹配，禁止访问
      throw new UnauthorizedException('您的账号在其他地方登录，请重新登录');
    }
    return true;
  }
}
