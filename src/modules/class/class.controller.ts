import { Body, Controller, Get, Post, Res,HttpStatus, Version, Put, Param, Delete, Query  } from '@nestjs/common';
import { ClassService } from './class.service';
import { Response } from 'express';
import { ApiBody,ApiTags,ApiBearerAuth, ApiParam  } from '@nestjs/swagger';
@ApiTags('Class')
@Controller({ path: 'classes', version: '' })
export class ClassController {
  constructor(private readonly classService: ClassService) {}


  @Version('')
  @Get()
  async getAll( @Res() res: Response) {
   let result= await this.classService.getAll();
   return res.status(result.status||HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  @Get('search')
  async search(@Query('keyword') keyword: string, @Res() res: Response,) {
    console.log("keyword",keyword);
    const result = await this.classService.search(keyword);
    return res.status(result.status||HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  @Get(':id')
  async getOne( @Res() res: Response, @Param('id') id: string) {
   let result= await this.classService.getOne(Number(id));
   return res.status(result.status||HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }


  @Version('')
  @Post()
  @ApiBody({ 
    description: 'Create a new class',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        teacher: { type: 'string' },
        course_id: { type: 'number' },
        max_students: { type: 'number'},
      },
      required: ['name', 'teacher', 'course_id', 'max_students']
    }
  })
  @ApiBearerAuth()
  async create(@Body() class_data: any , @Res() res: Response): Promise<any>  {
    let result= await this.classService.create(class_data);
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }


  @Put(':id')
  @ApiBody({ 
    description: 'Update class',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string',default:"Class name" },
        teacher: { type: 'string',default:"Bill gate" },
        course_id: { type: 'number',default: 1 },
        max_students: { type: 'number',default:100},
      },
      required: []
    }
  })
  @ApiParam({ name: 'id', description: 'ID of the class', type: 'string' })
  @ApiBearerAuth()
  async update(@Param('id') id: string,@Body() class_data: any , @Res() res: Response): Promise<any>  {
    let result= await this.classService.update(class_data,Number(id));
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }


  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID of the class', type: 'string' })
  @ApiBearerAuth()
  async delete(@Param('id') id: string, @Res() res: Response): Promise<any>  {
    let result= await this.classService.delete(Number(id));
    return res.status(result.status||HttpStatus.BAD_REQUEST).json(result.data);
  }
  
}
