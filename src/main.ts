/*
 * @Author: Y
 * @Date: 2021-12-17 22:58:26
 * @LastEditTime: 2021-12-23 21:17:21
 * @LastEditors: Y
 * @Description:
 */
import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { logger } from './middleware/logger.middleware';
import { AllExceptionsFilter } from './filter/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.use(logger);
  // 注册全局错误的过滤器
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器 先进后出
  //处理成功时返回结果
  app.useGlobalInterceptors(new TransformInterceptor());
  //对象序列化,隐藏密码,密码盐信息, Reflector 帮助类
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));
  // 设置swagger文档;
  const config = new DocumentBuilder()
    .setTitle('后台')
    .setDescription('后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
