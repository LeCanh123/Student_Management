import { Body, Controller, Get, Post, Res, HttpStatus, Version, Put, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StudentService } from './student.service'; 
import { Response } from 'express';
import { ApiBody, ApiTags, ApiBearerAuth, ApiParam, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { Api,file_setup} from './swagger/student.swagger';
import StudentDto from './dtos/student.dto';


@ApiTags('Student')
@Controller({ path: 'students', version: '' })
export class StudentController {
  constructor(private readonly studentService: StudentService) { }


  @Version('')
  @Get()
  @ApiResponse(Api.get_success)
  @ApiResponse(Api.get_error)
  @ApiBearerAuth()
  async getAll(@Res() res: Response,@Query('skip') skip: string,@Query('take') take: string,) {
    let result = await this.studentService.getAll(Number(skip),Number(take));
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  
  @Version('')
  @Post('async-with-excel')
  @UseInterceptors(file_setup)
  @ApiConsumes('multipart/form-data')
  @ApiBody(Api.body_async_with_excel)
  @ApiResponse(Api.async_with_excel_success)
  @ApiResponse(Api.async_with_excel_failed)
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
  @ApiResponse(Api.search_success)
  @ApiResponse(Api.search_server_error)
  @ApiBearerAuth()
  async search(@Query('keyword') keyword: string, @Res() res: Response,
  @Query('skip') skip: string,
  @Query('take') take: string, 
  ) {
    console.log("keyword", keyword);
    const result = await this.studentService.search(keyword,Number(skip),Number(take));
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }

  @Get(':id')
  @ApiResponse(Api.get_by_id_success)
  @ApiResponse(Api.get_by_id_error)
  @ApiBearerAuth()
  async getOne(@Res() res: Response, @Param('id') id: string) {
    let result = await this.studentService.getOne(Number(id));
    return res.status(result.status || HttpStatus.INTERNAL_SERVER_ERROR).json(result.data);
  }


  @Version('')
  @Post()
  @ApiResponse(Api.create_success)
  @ApiResponse(Api.create_error_bad)
  @ApiBody(Api.body_create)
  @ApiBearerAuth()
  async create(@Body() student_data: StudentDto, @Res() res: Response): Promise<any> {
    let result = await this.studentService.create(student_data);
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }


  @Put(':id')
  @ApiResponse(Api.update_success)
  @ApiResponse(Api.update_not_found)
  @ApiResponse(Api.update_bad)
  @ApiBody(Api.body_update)
  @ApiParam({ name: 'id', description: 'ID of the student', type: 'string' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() student_data: any, @Res() res: Response): Promise<any> {
    let result = await this.studentService.update(student_data, Number(id));
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }


  @Delete(':id')
  @ApiResponse(Api.delete_success)
  @ApiResponse(Api.delete_not_found)
  @ApiResponse(Api.delete_bad)
  @ApiParam({ name: 'id', description: 'ID of the student', type: 'string' })
  @ApiBearerAuth()
  async delete(@Param('id') id: string, @Res() res: Response): Promise<any> {
    let result = await this.studentService.delete(Number(id));
    return res.status(result.status || HttpStatus.BAD_REQUEST).json(result.data);
  }

  
}
