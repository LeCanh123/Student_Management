import { Body, Controller, Get, Post, Res,HttpStatus, Version, Req, UseInterceptors, UploadedFile  } from '@nestjs/common';
import { UserService } from './user.service';
import UserDto from './dtos/user.dto';
import UserLoginDto from './dtos/user-login.dto';
import { Response } from 'express';
import { ApiTags,ApiBody, ApiResponse,ApiConsumes } from '@nestjs/swagger';
import { Api,file_setup} from './swagger/user.swagger';

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
  @ApiBody(Api.body_create)
  @ApiResponse(Api.create_success)
  @ApiResponse(Api.create_bad)
  @ApiBody(Api.body_create)
  async create(@Body() user: UserDto, @Res() res: Response,@UploadedFile() file): Promise<any>  {
    let result= await this.userService.create(user);
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }

  @Post('/login')
  @ApiBody(Api.body_login)
  @ApiResponse(Api.login_success)
  @ApiResponse(Api.login_error)
  async login(@Body() user: UserLoginDto, @Res() res: Response): Promise<any> {
    const { email, password } = user;
    let result=await this.userService.login(email, password);
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }
}
