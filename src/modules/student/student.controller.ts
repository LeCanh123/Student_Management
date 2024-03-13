import { Body, Controller, Get, Post, Res, HttpStatus, Version, Put, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StudentService } from './student.service'; 
import { Response } from 'express';
import { ApiBody, ApiTags, ApiBearerAuth, ApiParam, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { async_with_excel_failed, async_with_excel_success, body_async_with_excel, body_create, body_update, create_error_bad, create_success,
delete_bad, delete_not_found, delete_success, file_setup, get_by_id_error, 
get_by_id_success, get_error, get_success, search_server_error, 
search_success, update_bad, update_not_found, update_success } from './swagger/student.swagger';
import StudentDto from './dtos/student.dto';


@ApiTags('Student')
@Controller({ path: 'students', version: '' })
export class StudentController {
  constructor(private readonly studentService: StudentService) { }


  @Version('')
  @Get()
  @ApiResponse(get_success)
  @ApiResponse(get_error)
  @ApiBearerAuth()
  async getAll(@Res() res: Response) {
    let result = await this.studentService.getAll();
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  
  @Version('')
  @Post('async-with-excel')
  @UseInterceptors(file_setup)
  @ApiConsumes('multipart/form-data')
  @ApiBody(body_async_with_excel)
  @ApiResponse(async_with_excel_success)
  @ApiResponse(async_with_excel_failed)
  @ApiBearerAuth()
  async async_With_Excel(@Res() res: Response,@UploadedFile() file) {
    console.log("file",file);
    if(file){
      let filePath=file.path
      let result = await this.studentService.create_with_exel({path:filePath});
      return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
    }else{
      let result = await this.studentService.create_with_exel({path:null});
      return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
    }
  } 




  @Get('search')
  @ApiResponse(search_success)
  @ApiResponse(search_server_error)
  @ApiBearerAuth()
  async search(@Query('keyword') keyword: string, @Res() res: Response,) {
    console.log("keyword", keyword);
    const result = await this.studentService.search(keyword);
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  @Get(':id')
  @ApiResponse(get_by_id_success)
  @ApiResponse(get_by_id_error)
  @ApiBearerAuth()
  async getOne(@Res() res: Response, @Param('id') id: string) {
    let result = await this.studentService.getOne(Number(id));
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }


  @Version('')
  @Post()
  @ApiResponse(create_success)
  @ApiResponse(create_error_bad)
  @ApiBody(body_create)
  @ApiBearerAuth()
  async create(@Body() student_data: StudentDto, @Res() res: Response): Promise<any> {
    let result = await this.studentService.create(student_data);
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }


  @Put(':id')
  @ApiResponse(update_success)
  @ApiResponse(update_not_found)
  @ApiResponse(update_bad)
  @ApiBody(body_update)
  @ApiParam({ name: 'id', description: 'ID of the student', type: 'string' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() student_data: any, @Res() res: Response): Promise<any> {
    let result = await this.studentService.update(student_data, Number(id));
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }


  @Delete(':id')
  @ApiResponse(delete_success)
  @ApiResponse(delete_not_found)
  @ApiResponse(delete_bad)
  @ApiParam({ name: 'id', description: 'ID of the student', type: 'string' })
  @ApiBearerAuth()
  async delete(@Param('id') id: string, @Res() res: Response): Promise<any> {
    let result = await this.studentService.delete(Number(id));
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }

  
}
