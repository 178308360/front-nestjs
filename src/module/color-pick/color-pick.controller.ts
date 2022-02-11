/*
 * @Author: Y
 * @Date: 2022-02-04 00:20:53
 * @LastEditTime: 2022-02-10 18:18:57
 * @LastEditors: Y
 * @Description:
 */
import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { returnResponse } from 'src/utils/res';
import { ColorPickService } from './color-pick.service';
@ApiTags('色盘')
@Controller('colorPick')
export class ColorPickController {
  constructor(private readonly colorPickService: ColorPickService) {}

  @ApiOperation({ summary: '获取所有色盘' })
  @Get()
  // @UseGuards(TokenGuard)
  // @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Query()
    query: {
      userId?: number;
      orderBy: string;
      order: any;
      diskName?: string;
      userName?: string;
    },
  ): Promise<any> {
    const res = await this.colorPickService.findAll(query);
    try {
      if (res.length > 0) {
        return returnResponse('1', '查找成功', res);
      } else {
        return returnResponse('0', '未找到');
      }
    } catch (error) {
      return returnResponse('-1', '查找失败');
    }
  }
}
