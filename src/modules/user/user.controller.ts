import { Body, Controller, Get, Post, Res,HttpStatus, Version, Req, UseInterceptors, UploadedFile  } from '@nestjs/common';
import { UserService } from './user.service';
import UserDto from './dtos/user.dto';
import UserLoginDto from './dtos/user-login.dto';
import { Response } from 'express';
import { ApiTags,ApiBody, ApiResponse,ApiConsumes } from '@nestjs/swagger';
import { body_create, body_login, create_bad, create_success, login_error, login_success,
  file_setup
} from './swagger/user.swagger';

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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(file_setup)
  @ApiBody(body_create)
  @ApiResponse(create_success)
  @ApiResponse(create_bad)
  @ApiBody(body_create)
  async create(@Body() user: UserDto, @Res() res: Response,@UploadedFile() file): Promise<any>  {
    let result= await this.userService.create(user);
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }

  @Post('/login')
  @ApiBody(body_login)
  @ApiResponse(login_success)
  @ApiResponse(login_error)
  async login(@Body() user: UserLoginDto, @Res() res: Response): Promise<any> {
    const { email, password } = user;
    let result=await this.userService.login(email, password);
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }
}
