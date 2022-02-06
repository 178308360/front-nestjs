/*
 * @Author: Y
 * @Date: 2022-02-04 00:20:53
 * @LastEditTime: 2022-02-06 15:30:58
 * @LastEditors: Y
 * @Description:
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ColorPickService } from './color-pick.service';
import { CreateColorPickDto } from './dto/create-color-pick.dto';
import { UpdateColorPickDto } from './dto/update-color-pick.dto';

@Controller('colorPick')
export class ColorPickController {
  constructor(private readonly colorPickService: ColorPickService) {}

  @Post()
  create(@Body() createColorPickDto: CreateColorPickDto) {
    return this.colorPickService.create(createColorPickDto);
  }

  @Get()
  findAll() {
    return this.colorPickService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorPickService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateColorPickDto: UpdateColorPickDto,
  ) {
    return this.colorPickService.update(+id, updateColorPickDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorPickService.remove(+id);
  }
}
