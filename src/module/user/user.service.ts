/*
 * @Author: Y
 * @Date: 2021-12-17 23:17:17
 * @LastEditTime: 2021-12-23 00:03:58
 * @LastEditors: Y
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { makeSalt, encryptPassword } from 'src/utils/cryptogram';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  /**
   * @description:"获取所有用户"
   * @param {Object} query 分页信息
   * @return {*}
   */
  async findAll({
    pageNum,
    pageSize,
  }: {
    pageNum: number;
    pageSize: number;
  }): Promise<User[]> {
    const users = await this.usersRepository.find({
      order: {
        id: 'ASC',
      },
      //偏移位置
      skip: pageSize * (pageNum - 1),
      //获取条数
      take: pageSize,
    });
    return users;
  }
  /**
   * @description:"获取指定用户通过ID"
   * @param {number} id 用户ID
   * @return {*}
   */

  async findById(id: string): Promise<User | undefined> {
    return await this.usersRepository.findOne(id);
  }
  /**
   * @description:"获取指定用户通过用户名"
   * @param {string} userName 用户名
   * @return {*}
   */
  async findByName(userName: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ userName });
  }
  /**
   * @description:"创建用户"
   * @param {CreateUserDto} info 新用户信息
   * @return {*}
   */
  async create(info: CreateUserDto): Promise<User | undefined> {
    //判断用户名是否被注册过
    const res = await this.findByName(info.userName);
    if (res == undefined) {
      //制作盐,传入对象
      const salt = makeSalt();
      info.salt = salt;
      //加密密码
      info.password = encryptPassword(info.password, salt);
      return await this.usersRepository.save(info);
    }
    return null;
  }

  /**
   * @description:"修改用户信息"
   * @param {User} oldValue 旧的用户信息
   * @param {UpdateUserDto} newValue 新的用户信息
   * @return {*}
   */
  async update(oldValue: User, newValue: UpdateUserDto): Promise<any> {
    const salt = oldValue.salt;
    newValue.password = encryptPassword(newValue.password, salt);
    const res = await this.usersRepository.update(oldValue.id, newValue);
    return res;
  }
  /**
   * @description:"删除用户"
   * @param {string} id 用户ID
   * @return {*}
   */
  async remove(id: string): Promise<any> {
    return await this.usersRepository.delete(id);
  }
}
