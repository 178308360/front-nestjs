/*
 * @Author: Y
 * @Date: 2021-12-17 22:58:26
 * @LastEditTime: 2022-02-07 23:52:38
 * @LastEditors: Y
 * @Description:
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { UserController } from './module/user/user.controller';
import { ColorPickModule } from './module/color-pick/color-pick.module';
import dbConfig from './config/db';
import { ColorPickController } from './module/color-pick/color-pick.controller';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: dbConfig.mysql.host,
      port: dbConfig.mysql.port,
      username: dbConfig.mysql.user,
      password: dbConfig.mysql.password,
      database: dbConfig.mysql.database,
      timezone: '+08:00', // 东八时区
      logging: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ColorPickModule,
  ],
  controllers: [UserController, ColorPickController],
  providers: [],
})
export class AppModule {}
