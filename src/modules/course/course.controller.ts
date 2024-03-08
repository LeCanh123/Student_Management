import { Body, Controller, Get, Post, Res,HttpStatus, Version, Put, Param, Delete, Query  } from '@nestjs/common';
import { CourseService } from './course.service';
import { Response } from 'express';
import { ApiBody,ApiTags,ApiBearerAuth, ApiParam  } from '@nestjs/swagger';
import CourseDto from './dtos/course.dto';
@ApiTags('Course')
@Controller({ path: 'course', version: '' })
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Version('')
  @Get()
  async getAll( @Res() res: Response) {
   let result= await this.courseService.getAll();
   return res.status(result.status||HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  @Get('search')
  async search(@Query('keyword') keyword: string, @Res() res: Response,) {
    console.log("keyword",keyword);
    const result = await this.courseService.search(keyword);
    return res.status(result.status||HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  @Get(':id')
  async getOne( @Res() res: Response, @Param('id') id: string) {
   let result= await this.courseService.getOne(Number(id));
   return res.status(result.status||HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  
  @Post()
  @ApiBody({ 
    description: 'Create a new course',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        duration: { type: 'number' },
        start_date: { type: 'string', format: 'date-time' },
        end_date: { type: 'string', format: 'date-time' }
      },
      required: ['name', 'description', 'duration', 'start_date', 'end_date']
    }
  })
  @ApiBearerAuth()
  async create(@Body() course: any , @Res() res: Response): Promise<any>  {
    let result= await this.courseService.create(course);
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }


  @Put(':id')
  @ApiBody({ 
    description: 'Update course',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        duration: { type: 'number' },
        start_date: { type: 'string', format: 'date-time' },
        end_date: { type: 'string', format: 'date-time' }
      },
      required: ['name', 'description', 'duration', 'start_date', 'end_date']
    }
  })
  @ApiParam({ name: 'id', description: 'ID of the course', type: 'string' })
  @ApiBearerAuth()
  async update(@Param('id') id: string,@Body() course: any , @Res() res: Response): Promise<any>  {
    console.log("id",id);
    
    let result= await this.courseService.update(course,Number(id));
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID of the course', type: 'string' })
  @ApiBearerAuth()
  async delete(@Param('id') id: string, @Res() res: Response): Promise<any>  {
    let result= await this.courseService.delete(Number(id));
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }
}
