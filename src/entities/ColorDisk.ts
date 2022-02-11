/*
 * @Author: Y
 * @Date: 2021-12-17 23:26:51
 * @LastEditTime: 2022-02-10 16:05:11
 * @LastEditors: Y
 * @Description:
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { formatTime } from './valueTransformer';

@Entity('color_disk', { schema: 'front' })
export class ColorDisk {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('char', { name: 'user_name', length: 20 })
  userName: string;

  @Column('char', { name: 'disk_name', length: 255 })
  diskName: string;

  @Column('int', { name: 'disk_type', nullable: true, default: () => "'0'" })
  diskType: number | null;

  @Column('char', { name: 'bcg_head', nullable: true, length: 20 })
  bcgHead: string | null;

  @Column('char', { name: 'fc_head', nullable: true, length: 20 })
  fcHead: string | null;

  @Column('char', { name: 'bcg_left', nullable: true, length: 20 })
  bcgLeft: string | null;

  @Column('char', { name: 'fc_left', nullable: true, length: 20 })
  fcLeft: string | null;

  @Column('char', { name: 'bcg_content', nullable: true, length: 20 })
  bcgContent: string | null;

  @Column('char', { name: 'fc_content', nullable: true, length: 20 })
  fcContent: string | null;

  @Column('char', { name: 'bcg_right', nullable: true, length: 20 })
  bcgRight: string | null;

  @Column('char', { name: 'fc_right', nullable: true, length: 20 })
  fcRight: string | null;

  @Column('char', { name: 'bcg_foot', nullable: true, length: 20 })
  bcgFoot: string | null;

  @Column('char', { name: 'fc_foot', nullable: true, length: 20 })
  fcFoot: string | null;

  @Column('char', { name: 'primary_color', nullable: true, length: 20 })
  primaryColor: string | null;

  @Column('int', { name: 'hot_view', nullable: true, default: () => "'0'" })
  hotView: number | null;
}
