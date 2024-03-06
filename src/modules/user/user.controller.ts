import { Body, Controller, Get, Post, Res,HttpStatus  } from '@nestjs/common';
import { UserService } from './user.service';
import UserDto from './dtos/user.dto';
import UserLoginDto from './dtos/user-login.dto';
import { Response } from 'express';

import { ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Post()
  async create(@Body() user: UserDto , @Res() res: Response): Promise<any>  {
    let result= await this.userService.create(user);
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }

  @Post('/login')
  async login(@Body() user: UserLoginDto, @Res() res: Response): Promise<any> {
    const { email, password } = user;
    let result=await this.userService.login(email, password);
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }
}
