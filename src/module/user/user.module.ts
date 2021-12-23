/*
 * @Author: Y
 * @Date: 2021-12-17 23:17:17
 * @LastEditTime: 2021-12-23 22:32:16
 * @LastEditors: Y
 * @Description:
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
