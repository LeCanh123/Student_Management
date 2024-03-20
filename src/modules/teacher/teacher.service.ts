import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import TeacherDto from './dtos/teacher.dto';
import UpdateTeacherDto from './dtos/update-teacher.dto';
import { Teacher } from './database/teacher.entity';


@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) { }

  async getAll(skip:number,take:number) {
    try {
      const data = await this.teacherRepository.find({ where: { status: true }, relations: ['class'],
      skip: skip?skip:0,
      take: take?take:1000 
      });
      const total = await this.teacherRepository.createQueryBuilder('teacher')
      .where("teacher.status = :status", { status: true })
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
      console.log("error",error);
      
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
      const data = await this.teacherRepository.find({ where: { id: id },relations: ['class'] });
      if (!data || data?.length == 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Teacher with offer ID not found."
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

  async create(teacher_data: TeacherDto) {
    try {
      let checkEmail = await this.teacherRepository.findBy({
        email:teacher_data.email
      })
      if(checkEmail.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "Email already exists"
          }
        };
      }
      let checkPhone = await this.teacherRepository.findBy({
        phone:Number(teacher_data.phone)
      })
      if(checkPhone.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "Phone number already exists"
          }
        };
      }
      const newTeacher = await this.teacherRepository.save({
        ...teacher_data,
        phone:Number(teacher_data.phone)
      });
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Create new teacher success"
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

  async update(teacher_data: UpdateTeacherDto, id: number) {
    console.log("teacher_data",teacher_data);
    
    try {
      const findTeacher = await this.teacherRepository.findOne({ where: { id: id } });
      if (!findTeacher) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Teacher with offer ID not found."
          }
        };
      }
      let checkEmail = await this.teacherRepository.createQueryBuilder('teacher')
      .where('teacher.email = :email', { email:teacher_data.email })
      .andWhere('teacher.id != :id', { id })
      .getMany();
      if(checkEmail.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "Email already exists"
          }
        };
      }
      let checkPhone = await this.teacherRepository.createQueryBuilder('teacher')
      .where('teacher.phone = :phone', { phone:teacher_data.phone })
      .andWhere('teacher.id != :id', { id })
      .getMany();
      if(checkPhone.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "Phone number already exists"
          }
        };
      }
      const updateTeacher = await this.teacherRepository.update(Number(id), {
        name:teacher_data.name,
        dob:teacher_data.dob,
        email:teacher_data.email,
        phone:Number(teacher_data.phone),
        address:teacher_data.address,
      });
      return {
        status: HttpStatus.OK,
        data: {
          success: true,
          message: "Update teacher success"
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

  async search(keyword: string,skip:number,take:number) {
    try {
        const teachers = await this.teacherRepository.find({
          where: {
            name: ILike(`%${keyword}%`),
            status:true
          },
          relations: ['class'],
          skip: skip,
          take: take
        });
        const total = await this.teacherRepository.count({
          where: {name: ILike(`%${keyword}%`),
            status:true
          },
        })
      return {
        status: HttpStatus.OK,
        data: {data:teachers,total}
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
      const findTeacher = await this.teacherRepository.findOne({ where: { id: id } });
      if (!findTeacher) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Teacher with offer ID not found."
          }
        };

      }
      const deleteCourse = await this.teacherRepository.update(Number(id), { status: false });
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Delete teacher success"
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
