/*
 * @Author: Y
 * @Date: 2021-12-21 00:00:01
 * @LastEditTime: 2022-01-27 22:01:00
 * @LastEditors: Y
 * @Description:
 */
// src/logical/auth/auth.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../../utils/cryptogram';
import { RedisInstance } from 'src/utils/redis';
const svgCaptcha = require('svg-captcha');
@Injectable()
export class AuthService {
  private pointer = 0;
  private captchas = [];
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(
    username: string,
    password: string,
    code: string,
    id: string,
  ): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.usersService.findByName(username);
    if (user) {
      const hashedPassword = user.password;
      const salt = user.salt;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        if (this.captchas[id].toLowerCase() !== code.toLowerCase()) {
          // throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
          return '验证码错误';
        }
        return user;
      }
    }
    return null;
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      username: user.userName,
      id: user.id,
      character: user.character,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    const token = this.jwtService.sign(payload);
    // 实例化 redis
    // const redis = await RedisInstance.initRedis('auth.certificate', 0);
    // // 将用户信息和 token 存入 redis，并设置失效时间，语法：[key, seconds, value]
    // await redis.setex(user.id + '-' + user.userName, 3600, `${token}`);
    return {
      id: payload.id,
      username: payload.username,
      token,
      character: payload.character,
      realName: user.realName,
    };
  }
  /**
   * @description: "生成验证码"
   * @param {string} id
   * @return {*}
   */
  async createCaptcha(id?: string) {
    try {
      if (id !== '-1') {
        delete this.captchas[id];
      }
      const c = svgCaptcha.create();
      this.captchas[this.pointer] = c.text;
      return {
        id: this.pointer++,
        img: c.data,
      };
    } catch (error) {
      return null;
    }
  }
}
