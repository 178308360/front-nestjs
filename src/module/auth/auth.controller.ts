/*
 * @Author: Y
 * @Date: 2021-12-17 23:17:17
 * @LastEditTime: 2022-01-26 13:51:26
 * @LastEditors: Y
 * @Description:
 */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('权限')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '获取主页验证码' })
  @Get('captcha/:id')
  async getSvgCaptcha(@Param('id') id: string): Promise<any> {
    const res = await this.authService.createCaptcha(id);
    const data = res
      ? {
          data: res,
          code: '1',
          msg: '获取成功',
        }
      : {
          data: res,
          code: '0',
          msg: '获取失败',
        };
    return data;
  }
}
