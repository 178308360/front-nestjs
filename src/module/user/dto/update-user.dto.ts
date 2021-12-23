/*
 * @Author: Y
 * @Date: 2021-12-19 22:12:53
 * @LastEditTime: 2021-12-20 21:33:07
 * @LastEditors: Y
 * @Description:"修改用户信息请求期望的数据类型"
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({ description: '密码' })
  @IsString({ message: '密码需要字符类型' })
  @IsNotEmpty({ message: '密码必填' })
  password: string;
  @ApiPropertyOptional({ description: '真实性名' })
  @IsString({ message: '姓名需要字符串类型' })
  @IsNotEmpty({ message: '姓名必填' })
  realName: string;
  @ApiPropertyOptional({ description: '手机号' })
  @IsString({ message: '手机号需要字符串类型' })
  @IsNotEmpty({ message: '手机号必填' })
  mobile: string;
  @ApiPropertyOptional({ description: '角色' })
  @IsString({ message: '角色需要字符串类型' })
  @IsNotEmpty({ message: '角色必填' })
  character: string;
}
