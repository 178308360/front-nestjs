import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

/*
 * @Author: Y
 * @Date: 2021-12-19 20:10:51
 * @LastEditTime: 2022-01-24 14:50:10
 * @LastEditors: Y
 * @Description: "创建用户请求期望的数据类型"
 */
export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsString({ message: '用户名需要字符串类型' })
  @IsNotEmpty({ message: '用户名必填' })
  @Matches(/^[a-zA-Z][a-zA-Z0-9_-]{7,12}$/, {
    message: '用户名8到13位（字母，数字，下划线，减号）,首位为字母',
  })
  userName: string;
  @ApiProperty({ description: '密码' })
  @IsString({ message: '密码需要字符类型' })
  @IsNotEmpty({ message: '密码必填' })
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9A-Za-z~!@#$%^&*._?]{8,15}$/, {
    message:
      '密码必须包括数字、字母两种字符，特殊字符可有可无，长度在8-15位之间',
  })
  password: string;
  @ApiProperty({ description: '真实性名' })
  @IsString({ message: '姓名需要字符串类型' })
  @IsNotEmpty({ message: '姓名必填' })
  @Matches(/^[\u4E00-\u9FA5A-Za-z]{2,5}$/, {
    message: '姓名为2-5位',
  })
  realName: string;
  @ApiPropertyOptional({ description: '密码盐' })
  salt: string;
  @ApiProperty({ description: '手机号' })
  @IsString({ message: '手机号需要字符串类型' })
  @IsNotEmpty({ message: '手机号必填' })
  @Matches(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/, {
    message: '手机号为11位',
  })
  mobile: string;
  @ApiProperty({ description: '角色' })
  @IsString({ message: '角色需要字符串类型' })
  @IsNotEmpty({ message: '角色必填' })
  character: string;
}
