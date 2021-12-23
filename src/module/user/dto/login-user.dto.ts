/*
 * @Author: Y
 * @Date: 2021-12-20 00:17:45
 * @LastEditTime: 2021-12-20 00:21:15
 * @LastEditors: Y
 * @Description:"登录信息"
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
  @ApiProperty({ description: '用户名' })
  @IsString({ message: '用户名需要字符串类型' })
  @IsNotEmpty({ message: '用户名必填' })
  userName: string;
  @ApiProperty({ description: '密码' })
  @IsString({ message: '密码需要字符类型' })
  @IsNotEmpty({ message: '密码必填' })
  password: string;
}
