/*
 * @Author: Y
 * @Date: 2021-12-23 21:00:51
 * @LastEditTime: 2021-12-23 21:00:52
 * @LastEditors: Y
 * @Description:
 */
// src/database/redis.ts
import * as Redis from 'ioredis';
import { Logger } from '../utils/log4js';
import config from '../config/db';

let n = 0;
const redisIndex = []; // 用于记录 redis 实例索引
const redisList = []; // 用于存储 redis 实例

export class RedisInstance {
  static async initRedis(method: string, db = 0) {
    const isExist = redisIndex.some((x) => x === db);
    if (!isExist) {
      Logger.debug(
        `[Redis ${db}]来自 ${method} 方法调用, Redis 实例化了 ${++n} 次 `,
      );
      redisList[db] = new Redis({ ...config.redis, db });
      redisIndex.push(db);
    } else {
      Logger.debug(`[Redis ${db}]来自 ${method} 方法调用`);
    }
    return redisList[db];
  }
}
