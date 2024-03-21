import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import StudentDto from './dtos/student.dto';
import UpdateStudentDto from './dtos/update-student.dto';
import { Student } from './database/student.entity';
import * as xlsx from 'xlsx';
import { delete_file } from 'src/common/comon';
import { mapData } from './function/function';
const path = require('path');


@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) { }

  async getAll(skip:number,take:number) {
    try {
      const data = await this.studentRepository.find({ where: { status: true },relations: ['class','class.course'] ,
      skip: skip?skip:0,
      take: take?take:1000     
      });

      const total = await this.studentRepository.createQueryBuilder('student')
      .where("student.status = :status", { status: true })
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
      const data = await this.studentRepository.find({ where: { id: id },relations: ['class','class.course'] });
      if (!data || data?.length == 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Student with offer ID not found."
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

  async create(student_data: StudentDto) {
    try {
      let checkEmail = await this.studentRepository.findBy({
        email:student_data.email
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
      let checkPhone = await this.studentRepository.findBy({
        phone:student_data.phone
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
      const newstudent = await this.studentRepository.save({
        name:student_data.name,
        dob:student_data.dob,
        email:student_data.email,
        phone:student_data.phone,
        address:student_data.address,
        class:{id:student_data.class_id=="none"||undefined?null:student_data.class_id}
      });
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Create new student success"
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

  async update(student_data: UpdateStudentDto, id: number) {
    console.log("id",id);
    
    try {
      const findStudent = await this.studentRepository.findOne({ where: { id: id } });
      if (!findStudent) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Student with offer ID not found."
          }
        };
      }
      let checkEmail = await this.studentRepository.createQueryBuilder('student')
      .where('student.email = :email', { email:student_data.email })
      .andWhere('student.id != :id', { id })
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
      let checkPhone = await this.studentRepository.createQueryBuilder('student')
      .where('student.phone = :phone', { phone:student_data.phone })
      .andWhere('student.id != :id', { id })
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
      let newDataUpdate:any={}
      if(student_data.class_id=="none"||undefined){

      }else{
        newDataUpdate.class={id:student_data.class_id}
      }
      const updateStudent = await this.studentRepository.update(Number(id), {
        name:student_data.name,
        dob:student_data.dob,
        email:student_data.email,
        phone:student_data.phone,
        address:student_data.address,
        class:{id:(student_data.class_id&&student_data.class_id!='none')?student_data.class_id:null}
      });
      return {
        status: HttpStatus.OK,
        data: {
          success: true,
          message: "Update student success"
        }
      };
    }
    catch (error) {
      // console.log("err",error);
      
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

      const students = await this.studentRepository.find({
        where: {
          name: ILike(`%${keyword}%`),
          status:true
        },
        relations: ['class','class.course'],
        skip: skip,
        take: take
      });
      const total = await this.studentRepository.count({
        where: {name: ILike(`%${keyword}%`),
          status:true
        },
      })
      return {
        status: HttpStatus.OK,
        data: {data:students,total}
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
      const findstudent = await this.studentRepository.findOne({ where: { id: id } });
      if (!findstudent) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Student with offer ID not found."
          }
        };

      }
      const deleteStudent = await this.studentRepository.update(Number(id), { status: false });
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

  async create_with_exel(filepath:any) {
    try {
      const absolutePath = path.resolve();
      const workbook = xlsx.readFile(absolutePath+"/"+filepath.path);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data:any = xlsx.utils.sheet_to_json(worksheet);
      let studentRepository=this.studentRepository
      for (const item of data) {
        mapData(item,studentRepository)
      }
      let finalPAth=`${absolutePath}/${filepath.path}`
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
