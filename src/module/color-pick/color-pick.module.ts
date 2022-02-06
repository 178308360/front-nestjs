/*
 * @Author: Y
 * @Date: 2022-02-04 00:20:53
 * @LastEditTime: 2022-02-04 00:21:28
 * @LastEditors: Y
 * @Description:
 */
import { Module } from '@nestjs/common';
import { ColorPickService } from './color-pick.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorDisk } from 'src/entities/ColorDisk';

@Module({
  imports: [TypeOrmModule.forFeature([ColorDisk])],
  controllers: [],
  providers: [ColorPickService],
  exports: [ColorPickService],
})
export class ColorPickModule {}
