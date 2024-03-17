import { Body, Controller, Get, Post, Res,HttpStatus, Version, Req, UseInterceptors, UploadedFile, Put, Param, Query  } from '@nestjs/common';
import { UserService } from './user.service';
import UserDto from './dtos/user.dto';
import UserLoginDto from './dtos/user-login.dto';
import { Response } from 'express';
import { ApiTags,ApiBody, ApiResponse,ApiConsumes ,ApiParam, ApiBearerAuth} from '@nestjs/swagger';
import { Api,file_setup} from './swagger/user.swagger';
import * as fs from 'fs';
import * as path from 'path';
import { common } from 'src/common/comon';


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
    let avatar=await common.uploadFile(file);
    user.avatar=file?avatar.name:null
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

  @Get('search')
  @ApiResponse(Api.search_success)
  @ApiResponse(Api.search_server_error)
  @ApiBearerAuth()
  async search(@Query('keyword') keyword: string, @Res() res: Response,) {
    console.log("keyword", keyword);
    const result = await this.userService.search(keyword);
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  

  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(file_setup)
  @ApiBody(Api.body_update)
  @ApiResponse(Api.update_success)
  @ApiResponse(Api.update_bad)
  @ApiResponse(Api.update_not_found)
  @ApiParam({ name: 'id', description: 'ID of the user', type: 'string' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() data: any, @Res() res: Response,@UploadedFile() file): Promise<any> {
    let avatar=await common.uploadFile(file);
    data.avatar=file?avatar:null
    let result=await this.userService.update(data, Number(id));
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }
}
