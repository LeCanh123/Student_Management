import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import UserDto from '../user/dtos/user.dto';
import { Response } from 'express';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { body_create, create_bad, create_success } from './swagger/admin.swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }
  @Post('')
  @ApiBody(body_create)
  @ApiResponse(create_success)
  @ApiResponse(create_bad)
  async create(@Body() admin: UserDto, @Res() res: Response): Promise<any> {
    let result = await this.adminService.create(admin);
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }
}
