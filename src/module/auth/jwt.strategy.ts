/*
 * @Author: Y
 * @Date: 2021-12-20 00:08:27
 * @LastEditTime: 2021-12-23 21:46:56
 * @LastEditors: Y
 * @Description:"JWT策略,用于验证token"
 */
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtKey } from 'src/config/jwt.config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //请求中提取 JWT 的方法
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //确保 JWT 没有过期的责任委托给 Passport 模块
      ignoreExpiration: false,
      secretOrKey: jwtKey.secret,
    });
  }
  //对于 JWT 策略，Passport 首先验证 JWT 的签名并解码 JSON 。然后调用我们的 validate() 方法，该方法将解码后的 JSON 作为其单个参数传递。
  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: { username: string; id: any }) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    const user = { username: payload.username, id: payload.id };
    //返回后可在req中得到返回的值
    return user;
  }
}
