import { Body, Controller, Get, Post, Res,HttpStatus  } from '@nestjs/common';
import { AdminService } from './admin.service';
import UserDto from '../user/dtos/user.dto';
import { Response } from 'express';
import { ApiTags,ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    @Post('')
    @ApiBody({ 
      description: 'Create a new admin account',
      schema: {
        type: 'object',
        properties: {
          username: { type: 'string' ,default:"admin"},
          password: { type: 'string' ,default:"123456"},
          email: { type: 'string' ,default:"admin@gmail.com" },
          role: { type: 'number',default:0},
        },
        required: ['username', 'password', 'email', 'role']
      }
    })
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async create(@Body() admin: UserDto , @Res() res: Response): Promise<any>  {
      let result= await this.adminService.create(admin);
      return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
    }
}
