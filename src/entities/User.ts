/*
 * @Author: Y
 * @Date: 2021-12-17 23:26:51
 * @LastEditTime: 2021-12-23 00:16:52
 * @LastEditors: Y
 * @Description:"用户对应实体类"
 */
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { formatTime } from './valueTransformer';

@Entity('user', { schema: 'front' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'user_name', length: 20 })
  userName: string;

  @Column('varchar', { name: 'real_name', length: 20 })
  realName: string;
  @Exclude()
  @Column('varchar', { name: 'password', length: 50 })
  password: string;
  @Exclude()
  @Column('varchar', { name: 'salt', length: 10 })
  salt: string;

  @Column('varchar', { name: 'mobile', length: 20 })
  mobile: string;

  @Column('varchar', { name: 'character', length: 20 })
  character: string;

  @Column('datetime', {
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: formatTime,
  })
  createTime: Date;

  @Column('datetime', {
    name: 'update_time',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: formatTime,
  })
  updateTime: Date;
}
