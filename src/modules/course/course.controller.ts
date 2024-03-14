import { Body, Controller, Get, Post, Res, HttpStatus, Version, Put, Param, Delete, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { Response } from 'express';
import { ApiBody, ApiTags, ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import CourseDto from './dtos/course.dto';
import { Api } from './swagger/course.swagger';
@ApiTags('Course')
@Controller({ path: 'course', version: '' })
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Version('')
  @Get()
  @ApiResponse(Api.get_success)
  @ApiResponse(Api.get_error)
  @ApiBearerAuth()
  async getAll(@Res() res: Response) {
    let result = await this.courseService.getAll();
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  @Get('search')
  @ApiResponse(Api.search_success)
  @ApiResponse(Api.search_error)
  @ApiBearerAuth()
  async search(@Query('keyword') keyword: string, @Res() res: Response,) {
    console.log("keyword", keyword);
    const result = await this.courseService.search(keyword);
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  @Get(':id')
  @ApiResponse(Api.get_by_id_success)
  @ApiResponse(Api.get_by_id_error)
  @ApiBearerAuth()
  async getOne(@Res() res: Response, @Param('id') id: string) {
    let result = await this.courseService.getOne(Number(id));
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }


  @Post()
  @ApiResponse(Api.create_success)
  @ApiResponse(Api.create_error)
  @ApiBody(Api.body_create)
  @ApiBearerAuth()
  async create(@Body() course: CourseDto, @Res() res: Response): Promise<any> {
    let result = await this.courseService.create(course);
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }


  @Put(':id')
  @ApiResponse(Api.update_success)
  @ApiResponse(Api.update_not_found)
  @ApiResponse(Api.update_bad)
  @ApiBody(Api.body_update)
  @ApiParam({ name: 'id', description: 'ID of the course', type: 'string' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() course: any, @Res() res: Response): Promise<any> {
    console.log("id", id);

    let result = await this.courseService.update(course, Number(id));
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }

  @Delete(':id')
  @ApiResponse(Api.delete_success)
  @ApiResponse(Api.delete_not_found)
  @ApiResponse(Api.delete_bad)
  @ApiParam({ name: 'id', description: 'ID of the course', type: 'string' })
  @ApiBearerAuth()
  async delete(@Param('id') id: string, @Res() res: Response): Promise<any> {
    let result = await this.courseService.delete(Number(id));
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }
}
