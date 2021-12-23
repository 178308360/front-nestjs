/*
 * @Author: Y
 * @Date: 2021-12-17 22:58:26
 * @LastEditTime: 2021-12-23 17:22:11
 * @LastEditors: Y
 * @Description:
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { UserController } from './module/user/user.controller';
import dbConfig from './config/db';
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
      autoLoadEntities: true,
    }),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
