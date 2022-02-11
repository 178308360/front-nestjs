/*
 * @Author: Y
 * @Date: 2022-02-04 00:20:53
 * @LastEditTime: 2022-02-10 18:29:41
 * @LastEditors: Y
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorDisk } from 'src/entities/ColorDisk';
import { Repository } from 'typeorm';

@Injectable()
export class ColorPickService {
  constructor(
    @InjectRepository(ColorDisk)
    private colorDiskRepository: Repository<ColorDisk>,
  ) {}
  /**
   * @description:"获取所有色盘信息"
   * @param {Object} query 分页信息
   * @return {*}
   */
  async findAll({
    userId,
    orderBy,
    order,
    diskName,
    userName,
  }: {
    userId?: number;
    orderBy: string;
    order: any;
    diskName?: string;
    userName?: string;
  }): Promise<ColorDisk[]> {
    if (userId === undefined) {
      if (diskName === undefined) {
        if (userName != undefined) {
          const res = await this.colorDiskRepository
            .createQueryBuilder('colorPick')
            .where('colorPick.userName like :userName', {
              userName: '%' + userName + '%',
            })
            .orderBy(`colorPick.${orderBy}`, order)
            .getMany();
          return res;
        }
        const res = await this.colorDiskRepository
          .createQueryBuilder('colorPick')
          .orderBy(`colorPick.${orderBy}`, order)
          .getMany();
        return res;
      } else {
        const res = await this.colorDiskRepository
          .createQueryBuilder('colorPick')
          .where('colorPick.diskName like :diskName', {
            diskName: '%' + diskName + '%',
          })
          .orderBy(`colorPick.${orderBy}`, order)
          .getMany();
        return res;
      }
    } else {
      if (diskName === undefined) {
        if (userName != undefined) {
          const res = await this.colorDiskRepository
            .createQueryBuilder('colorPick')
            .where('colorPick.userName like :userName', {
              userName: '%' + userName + '%',
            })
            .orderBy(`colorPick.${orderBy}`, order)
            .getMany();
          return res;
        }
        const res = await this.colorDiskRepository
          .createQueryBuilder('colorPick')
          .where(`colorPick.userId=:userId`, { userId })
          .orderBy(`colorPick.${orderBy}`, order)
          .getMany();
        return res;
      } else {
        const res = await this.colorDiskRepository
          .createQueryBuilder('colorPick')
          .where(`colorPick.userId=:userId`, { userId })
          .andWhere('colorPick.diskName like :diskName', {
            diskName: '%' + diskName + '%',
          })
          .orderBy(`colorPick.${orderBy}`, order)
          .getMany();
        return res;
      }
    }
  }
}
