/*
 * @Author: Y
 * @Date: 2021-12-19 19:20:23
 * @LastEditTime: 2021-12-19 19:21:29
 * @LastEditors: Y
 * @Description:"值转换"
 */
import { ValueTransformer } from 'typeorm';
import * as dayjs from 'dayjs';

export const formatTime: ValueTransformer = {
  to: (entityValue: Date) => {
    return entityValue;
  },
  from: (databaseValue: Date) => {
    return dayjs(databaseValue).format('YYYY-MM-DD HH:mm:ss');
  },
};
