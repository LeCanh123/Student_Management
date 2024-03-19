import { Body, Controller, Get, Post, Res, HttpStatus,UseInterceptors, UploadedFile } from '@nestjs/common';
import { AdminService } from './admin.service';
import UserDto from '../user/dtos/user.dto';
import { Response } from 'express';
import { ApiTags, ApiBody, ApiResponse,ApiConsumes } from '@nestjs/swagger';
import { body_create, create_bad, create_success, file_setup,  } from './swagger/admin.swagger';
import { common } from 'src/common/comon';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }
  @Post('')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(file_setup)
  @ApiBody(body_create)
  @ApiResponse(create_success)
  @ApiResponse(create_bad)
  async create(@Body() admin: UserDto, @Res() res: Response,@UploadedFile() file): Promise<any> {
    let avatar=await common.uploadFile(file);
    admin.avatar=file?avatar.name:null
    let result = await this.adminService.create(admin);
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }
}
