import { Body, Controller, Get, Post, Res, HttpStatus, Version, Put, Param, Delete, Query } from '@nestjs/common';
import { ClassMembersService } from './class-members.service';
import { Response } from 'express';
import { ApiBody, ApiTags, ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { body_create, body_update, create_error_bad, create_success,
delete_bad, delete_not_found, delete_success, get_by_id_error, 
get_by_id_success, get_error, get_success, search_server_error, 
search_success, update_bad, update_not_found, update_success } from './swagger/class-members.swagger';
@ApiTags('ClassMember')
@Controller({ path: 'class-members', version: '' })
export class ClassMembersController {
  constructor(private readonly classService: ClassMembersService) { }


  @Version('')
  @Get()
  @ApiResponse(get_success)
  @ApiResponse(get_error)
  async getAll(@Res() res: Response) {
    let result = await this.classService.getAll();
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  @Get('search')
  @ApiResponse(search_success)
  @ApiResponse(search_server_error)
  async search(@Query('keyword') keyword: string, @Res() res: Response,) {
    console.log("keyword", keyword);
    const result = await this.classService.search(keyword);
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  @Get(':id')
  @ApiResponse(get_by_id_success)
  @ApiResponse(get_by_id_error)
  async getOne(@Res() res: Response, @Param('id') id: string) {
    let result = await this.classService.getOne(Number(id));
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }


  @Version('')
  @Post()
  @ApiResponse(create_success)
  @ApiResponse(create_error_bad)
  @ApiBody(body_create)
  @ApiBearerAuth()
  async create(@Body() class_data: any, @Res() res: Response): Promise<any> {
    let result = await this.classService.create(class_data);
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }


  @Put(':id')
  @ApiResponse(update_success)
  @ApiResponse(update_not_found)
  @ApiResponse(update_bad)
  @ApiBody(body_update)
  @ApiParam({ name: 'id', description: 'ID of the class', type: 'string' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() class_data: any, @Res() res: Response): Promise<any> {
    let result = await this.classService.update(class_data, Number(id));
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }


  @Delete(':id')
  @ApiResponse(delete_success)
  @ApiResponse(delete_not_found)
  @ApiResponse(delete_bad)
  @ApiParam({ name: 'id', description: 'ID of the class', type: 'string' })
  @ApiBearerAuth()
  async delete(@Param('id') id: string, @Res() res: Response): Promise<any> {
    let result = await this.classService.delete(Number(id));
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }

}