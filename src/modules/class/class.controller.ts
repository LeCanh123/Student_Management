import { Body, Controller, Get, Post, Res, HttpStatus, Version, Put, Param, Delete, Query } from '@nestjs/common';
import { ClassService } from './class.service';
import { Response } from 'express';
import { ApiBody, ApiTags, ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Api } from './swagger/class.swagger';
@ApiTags('Class')
@Controller({ path: 'classes', version: '' })
export class ClassController {
  constructor(private readonly classService: ClassService) { }


  @Version('')
  @Get()
  @ApiResponse(Api.get_success)
  @ApiResponse(Api.get_error)
  @ApiBearerAuth()
  async getAll(@Res() res: Response,@Query('skip') skip: string,@Query('take') take: string,) {
    let result = await this.classService.getAll(Number(skip),Number(take));
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  @Get('search')
  @ApiResponse(Api.search_success)
  @ApiResponse(Api.search_server_error)
  @ApiBearerAuth()
  async search(@Query('keyword') keyword: string, @Res() res: Response,
  @Query('skip') skip: string,
  @Query('take') take: string, 
  ) {
    console.log("keyword", keyword);
    const result = await this.classService.search(keyword,Number(skip),Number(take));
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  @Get(':id')
  @ApiResponse(Api.get_by_id_success)
  @ApiResponse(Api.get_by_id_error)
  @ApiBearerAuth()
  async getOne(@Res() res: Response, @Param('id') id: string) {
    let result = await this.classService.getOne(Number(id));
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }


  @Version('')
  @Post()
  @ApiResponse(Api.create_success)
  @ApiResponse(Api.create_error_bad)
  @ApiBody(Api.body_create)
  @ApiBearerAuth()
  async create(@Body() class_data: any, @Res() res: Response): Promise<any> {
    let result = await this.classService.create(class_data);
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }


  @Version('')
  @Post('/add-student')
  @ApiResponse(Api.add_student_success)
  @ApiResponse(Api.add_student_error_bad)
  @ApiBody(Api.body_add_student)
  @ApiBearerAuth()
  async add_student(@Body() data: any, @Res() res: Response): Promise<any> {
    let result = await this.classService.add_student(data);
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }


  @Put(':id')
  @ApiResponse(Api.update_success)
  @ApiResponse(Api.update_not_found)
  @ApiResponse(Api.update_bad)
  @ApiBody(Api.body_update)
  @ApiParam({ name: 'id', description: 'ID of the class', type: 'string' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() class_data: any, @Res() res: Response): Promise<any> {
    let result = await this.classService.update(class_data, Number(id));
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }


  @Delete(':id')
  @ApiResponse(Api.delete_success)
  @ApiResponse(Api.delete_not_found)
  @ApiResponse(Api.delete_bad)
  @ApiParam({ name: 'id', description: 'ID of the class', type: 'string' })
  @ApiBearerAuth()
  async delete(@Param('id') id: string, @Res() res: Response): Promise<any> {
    let result = await this.classService.delete(Number(id));
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }

}
