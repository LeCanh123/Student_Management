import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import ModuleCourseDto from './dtos/module-course.dto';
import UpdateModuleCourseDto from './dtos/update-module-course.dto';
import { ModuleCourse } from './database/module-course.entity';
import * as xlsx from 'xlsx';
import { delete_file } from 'src/common/comon';
import { mapData } from './function/function';
const path = require('path');


@Injectable()
export class ModuleCourseService {
  constructor(
    @InjectRepository(ModuleCourse)
    private readonly moduleCourseRepository: Repository<ModuleCourse>,
  ) { }

  async getAll(skip:number,take:number) {
    try {
      const data = await this.moduleCourseRepository.find({
        where: { status: true },
        relations: ['course'],
        skip: skip,
        take: take 
      });
      const total = await this.moduleCourseRepository.createQueryBuilder('modulecourse')
      .where("modulecourse.status = :status", { status: true })
      .getCount();
      return {
        status: HttpStatus.OK,
        data:{
          data,total
        }
      };
    }
    catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          error: "error",
          message: "Internal Server Error"
        }
      };
    }

  }

  async getOne(id: number) {
    try {
      const data = await this.moduleCourseRepository.find({ where: { id: id }, relations: ['course'] });
      if (!data || data?.length == 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Module course with offer ID not found."
          }
        };
      }
      return {
        status: HttpStatus.OK,
        data
      };
    }
    catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          error: "error",
          message: "Internal Server Error"
        }
      };
    }

  }

  async create(module_course_data: ModuleCourseDto) {
    try {
      const newModuleCourse = await this.moduleCourseRepository.save(module_course_data);
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Create new module course success"
        }
      };
    }
    catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          error: "Bad Request",
          message: "Data is invalid. Please check and try again."
        }
      };
    }
  }

  async update(module_course_data: UpdateModuleCourseDto, id: number) {
    try {

      const updateModuleCourse = await this.moduleCourseRepository.update(Number(id), {
        name: module_course_data.name,
        duration: module_course_data.duration,
        course: {
          id: module_course_data.course_id
        }
      });
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Update student success"
        }
      };
    }
    catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          error: "Bad Request",
          message: "Data is invalid"
        }
      };
    }
  }

  async search(keyword: string,skip:number,take:number) {
    try {
      const moduleCourse = await this.moduleCourseRepository.find({
        where: {
          name: ILike(`%${keyword}%`),
          status:true
        },
        relations: ['course'],
        skip: skip,
        take: take
      });
      const total = await this.moduleCourseRepository.count({
        where: {name: ILike(`%${keyword}%`),
          status:true
        },
      })

      return {
        status: HttpStatus.OK,
        data: {data:moduleCourse,total}
      };
    }
    catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {
          error: "error",
          message: "Internal Server Error"
        }
      };
    }

  }

  async delete(id: number) {
    try {
      const findstudent = await this.moduleCourseRepository.findOne({ where: { id: id } });
      if (!findstudent) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Student with offer ID not found."
          }
        };

      }
      const deleteStudent = await this.moduleCourseRepository.update(Number(id), { status: false });
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Delete student success"
        }
      };
    }
    catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          error: "Bad Request",
          message: "Data is invalid"
        }
      };
    }
  }

  async create_with_exel(filepath: any) {
    try {
      const absolutePath = path.resolve();
      const workbook = xlsx.readFile(absolutePath + "/" + filepath.path);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data: any = xlsx.utils.sheet_to_json(worksheet);
      let moduleCourseRepository = this.moduleCourseRepository
      for (const item of data) {
        mapData(item, moduleCourseRepository)
      }
      let finalPAth = `${absolutePath}/${filepath.path}`
      delete_file(finalPAth)
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Async student success"
        }
      };
    }
    catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          error: "Bad Request",
          message: "Data is invalid. Please check and try again."
        }
      };
    }
  }

}
