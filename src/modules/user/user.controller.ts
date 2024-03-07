import { Body, Controller, Get, Post, Res,HttpStatus, Version  } from '@nestjs/common';
import { UserService } from './user.service';
import UserDto from './dtos/user.dto';
import UserLoginDto from './dtos/user-login.dto';
import { Response } from 'express';
import { ApiTags,ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('User')
@Controller({ path: 'user', version: '' })
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Version('')
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Post()
  @ApiBody({ 
    description: 'Create a new user account',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' ,default:"user"},
        password: { type: 'string' ,default:"123456"},
        email: { type: 'string' ,default:"username@gmail.com"},
        role: { type: 'number',default:"1"},
      },
      required: ['username', 'password', 'email', 'role']
    }
  })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async create(@Body() user: UserDto , @Res() res: Response): Promise<any>  {
    let result= await this.userService.create(user);
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }

  @Post('/login')
  @ApiBody({ 
    description: 'Login',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' ,default:"username@gmail.com"},
        password: { type: 'string' ,default:"123456"},
      },
      required: ['username', 'password', 'email', 'role']
    }
  })
  @ApiResponse({ status: 200, description: 'Login success.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async login(@Body() user: UserLoginDto, @Res() res: Response): Promise<any> {
    const { email, password } = user;
    let result=await this.userService.login(email, password);
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }
}
