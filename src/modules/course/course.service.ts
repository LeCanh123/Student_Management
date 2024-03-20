import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';
import { Course } from './database/course.entity';
import CourseDto from './dtos/course.dto';
import UpdateCourseDto from './dtos/update-course.dto';


@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) { }
  async getAll(skip:number,take:number) {
    try {
      const data = await this.courseRepository.find({ where: { status: true }, relations: ['class', 'modulecourse'],
      skip: skip,
      take: take 
      });
      const total = await this.courseRepository.createQueryBuilder('course')
    .where("course.status = :status", { status: true })
    .getCount();
      return {
        status: HttpStatus.OK,
        data:{
          data,
          total
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
      const data = await this.courseRepository.find({ where: { id: id,status:true }, relations: ['class', 'modulecourse'] });
      if (!data || data?.length == 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Course with offer ID not found."
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

  async create(course: CourseDto) {
    console.log("course",course);
    
    try {
      let checkName = await this.courseRepository.find({where:{name:course.name,status:true}})
      if(checkName?.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "Name already exists"
          }
        };
      }
      const newCourse = await this.courseRepository.save({...course,duration:Number(course.duration),
        description:course.description||null
      });
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Create new course success"
        }
      };
    }
    catch (error) {
      console.log("error",error);
      
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          error: "Bad Request",
          message: "Data is invalid"
        }
      };
    }
  }

  async update(course: any, id: number) {
    console.log("course",course);
    try {
      const findCourse = await this.courseRepository.findOne({ where: { id: id } });
      if (!findCourse) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Course with offer ID not found."
          }
        };
      }
      let checkName=await this.courseRepository.find({where:{status:true,id: Not(id),name:course.name}});
      if(checkName.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "Name already exists"
          }
        };
      }
      const updateCourse = await this.courseRepository.update(Number(id), {
        name:course.name,
        description:course.description,
        duration:course.duration,
        start_date:course.start_date,
        end_date:course.end_date
      }
      );
      return {
        status: HttpStatus.OK,
        data: {
          success: true,
          message: "Update course success"
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
      const courses = await this.courseRepository.find({
        where: {
          name: ILike(`%${keyword}%`)
        },
        relations: ['class','modulecourse'],
        skip: skip,
        take: take
      });
      const total = await this.courseRepository.count({
        where: {name: ILike(`%${keyword}%`),
          status:true
        },
      })

      return {
        status: HttpStatus.OK,
        data: {data:courses,total}
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
      const findCourse = await this.courseRepository.findOne({ where: { id: id } });
      if (!findCourse) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Course with offer ID not found."
          }
        };

      }
      const deleteCourse = await this.courseRepository.update(Number(id), { status: false });
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Delete course success"
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

}
