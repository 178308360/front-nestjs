/*
 * @Author: Y
 * @Date: 2021-12-17 23:17:17
 * @LastEditTime: 2022-02-06 16:01:30
 * @LastEditors: Y
 * @Description:
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities/User';
import { TokenGuard } from 'src/guards/token.guard';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { returnResponse } from 'src/utils/res';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('用户')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '获取所有用户' })
  @Get()
  // @UseGuards(TokenGuard)
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query() query: { pageNum: number; pageSize: number }) {
    const res = await this.userService.findAll(query);
    if (res.length > 0) {
      return {
        users: res,
        pageNum: query.pageNum,
        pageSize: query.pageSize,
      };
    } else {
      throw new HttpException('未找到任何用户', HttpStatus.BAD_REQUEST);
    }
  }
  @ApiOperation({ summary: '获取指定用户通过ID' })
  @Get(':id')
  // @UseGuards(TokenGuard)
  @UseGuards(AuthGuard('jwt'))
  async findById(@Param('id') id: string): Promise<any> {
    const res = await this.userService.findById(id);
    try {
      if (res) {
        return returnResponse('1', '查找成功', res);
      } else {
        return returnResponse('0', '未找到用户');
      }
    } catch (error) {
      return returnResponse('-1', '查找失败');
    }
  }
  @ApiOperation({ summary: '获取指定用户通过用户名' })
  @Get('/name/:username')
  // @UseGuards(TokenGuard)
  // @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  async findByName(
    @Param('username') username: string,
    @Req() req,
  ): Promise<any> {
    const res = await this.userService.findByName(username);
    try {
      if (res) {
        return returnResponse('1', '查找成功', res);
      } else {
        return returnResponse('0', '未找到用户');
      }
    } catch (error) {
      return returnResponse('-1', '查找失败');
    }
  }
  @ApiOperation({ summary: '注册用户' })
  @Post('')
  @UsePipes(new ValidationPipe()) // 使用管道验证
  async register(@Body() info: CreateUserDto): Promise<any> {
    try {
      const res = await this.userService.create(info);
      if (res) {
        return returnResponse('1', '注册成功', res);
      } else {
        return returnResponse('0', '注册失败');
      }
    } catch (error) {
      return returnResponse('-1', '注册失败');
    }
  }
  @ApiOperation({ summary: '更新用户信息' })
  @Put(':id')
  @UsePipes(new ValidationPipe()) // 使用管道验证
  // @UseGuards(TokenGuard)
  @UseGuards(AuthGuard('jwt'))
  async updateUserById(
    @Body() updateInfo: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<any> {
    const oldValue = await this.userService.findById(id);
    if (!oldValue) {
      throw new HttpException(`id为${id}的用户不存在`, HttpStatus.BAD_REQUEST);
    }
    const updatedRes = await this.userService.update(oldValue, updateInfo);
    if (updatedRes.affected == 0) {
      throw new HttpException('修改失败', HttpStatus.BAD_REQUEST);
    }
  }
  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  // @UseGuards(TokenGuard)
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string): Promise<any> {
    const res = await this.userService.remove(id);
    if (res.affected !== 1) {
      throw new HttpException('删除失败', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: '登录用户' })
  //守卫在管道之前运行
  @Post('/login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe()) // 使用管道验证
  // // JWT验证 - Step 1: 用户请求登录
  async login(@Body() user: LoginDto): Promise<any> {
    console.log('JWT验证 - Step 1: 用户请求登录');
    try {
      const authResult = await this.authService.validateUser(
        user.userName,
        user.password,
        user.code,
        user.id,
      );
      if (authResult && typeof authResult != 'string') {
        return returnResponse(
          '1',
          '登录成功',
          await this.authService.certificate(authResult),
        );
      } else {
        if (typeof authResult == 'string') {
          return returnResponse('0', authResult);
        } else {
          return returnResponse('0', '用户名或密码错误');
        }
      }
    } catch (error) {
      return returnResponse('-1', '登录失败');
    }
  }
}
