import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/*
 * @Author: Y
 * @Date: 2021-12-19 20:10:51
 * @LastEditTime: 2021-12-19 22:05:24
 * @LastEditors: Y
 * @Description: "创建用户请求期望的数据类型"
 */
export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsString({ message: '用户名需要字符串类型' })
  @IsNotEmpty({ message: '用户名必填' })
  userName: string;
  @ApiProperty({ description: '密码' })
  @IsString({ message: '密码需要字符类型' })
  @IsNotEmpty({ message: '密码必填' })
  password: string;
  @ApiProperty({ description: '真实性名' })
  @IsString({ message: '姓名需要字符串类型' })
  @IsNotEmpty({ message: '姓名必填' })
  realName: string;
  @ApiPropertyOptional({ description: '密码盐' })
  salt: string;
  @ApiProperty({ description: '手机号' })
  @IsString({ message: '手机号需要字符串类型' })
  @IsNotEmpty({ message: '手机号必填' })
  mobile: string;
  @ApiProperty({ description: '角色' })
  @IsString({ message: '角色需要字符串类型' })
  @IsNotEmpty({ message: '角色必填' })
  character: string;
}
