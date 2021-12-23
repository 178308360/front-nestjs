/*
 * @Author: Y
 * @Date: 2021-12-17 23:26:51
 * @LastEditTime: 2021-12-19 19:23:44
 * @LastEditors: Y
 * @Description:
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('templet_page', { schema: 'front' })
export class TempletPage {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'templet_name', length: 255 })
  templetName: string;

  @Column('int', { name: 'project_id' })
  projectId: number;

  @Column('int', { name: 'creator' })
  creator: number;

  @Column('varchar', { name: 'descr', nullable: true, length: 255 })
  descr: string | null;

  @Column('longtext', { name: 'detail', nullable: true })
  detail: string | null;

  @Column('datetime', { name: 'createdAt', nullable: true })
  createdAt: Date | null;

  @Column('datetime', { name: 'updatedAt', nullable: true })
  updatedAt: Date | null;
}
