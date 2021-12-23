/*
 * @Author: Y
 * @Date: 2021-12-19 21:56:00
 * @LastEditTime: 2021-12-22 22:09:54
 * @LastEditors: Y
 * @Description:
 */
// src/pipe/validation.pipe.ts
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // console.log(`value:`, value, 'metatype: ', metatype);
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value;
    }
    // 将对象转换为 Class 来验证,转换 JavaScript 的参数为可验证的类型对象。
    const object = plainToClass(metatype, value);
    //验证
    const errors = await validate(object);
    // console.log(errors);

    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0]; // 只需要取第一个错误信息并返回即可
      throw new BadRequestException(`Validation failed: ${msg}`);
    }
    return value;
  }
  //toValidate() 方法。当验证类型不是 JavaScript 的数据类型时，跳过验证
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
