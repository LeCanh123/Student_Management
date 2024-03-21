import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Class } from './database/class.entity';
import ClassDto from './dtos/class.dto';
import UpdateClassDto from './dtos/update-class.dto';
import { Student } from '../student/database/student.entity';


@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) { }

  async getAll(skip:number,take:number) {
    try {
      const data = await this.classRepository.find({ where: { status: true } ,
        relations: ['course','teacher','student'],
        skip:skip?skip:0,take:take?take:1000 
      });
      const total = await this.classRepository.createQueryBuilder('class')
      .where("class.status = :status", { status: true })
      .getCount();

      console.log("data",data);
      
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
      const data = await this.classRepository.find({ where: { id: id },
        relations: ['course','teacher','student'] 
      });
      if (!data || data?.length == 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Class with offer ID not found."
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

  async create(class_data: ClassDto) {
    try {
      let checkClass= await this.classRepository.find({where:{name:class_data.name,status:true}})
      if(checkClass.length>0){
        return {
          status: HttpStatus.BAD_REQUEST,
          data: {
            error: "Bad Request",
            message: "Class name already exists"
          }
        };
      }
      const newClass = await this.classRepository.save({
        ...class_data,
        course: { id: class_data.course_id?Number(class_data.course_id):null },
        teacher: { id: class_data.teacher_id?Number(class_data.teacher_id):null }
      });
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Create new class success"
        }
      };
    }
    catch (error) {
      console.log("error",error);
      
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {
          error: "Bad Request",
          message: "Data is invalid. Please check and try again."
        }
      };
    }
  }

  async add_student(data: any) {
    try {
      const newClass = await this.studentRepository.update(Number(data.student_id), {class:{id:data.class_id}});
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Add student success"
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

  async update(class_data: UpdateClassDto, id: number) {
    console.log("class_data",class_data);
    
    try {
      const findClass = await this.classRepository.findOne({ where: { id: id } });
      if (!findClass) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Class with offer ID not found."
          }
        };
      }
      const updateClass = await this.classRepository.update(Number(id), {
        name: class_data.name,
        teacher: {id:((class_data.teacher_id)&&(String(class_data.teacher_id)!='none'))?class_data.teacher_id:null},
        course: { id: (class_data.course_id&&(String(class_data.course_id)!='none'))?class_data.course_id:null },
        max_students: class_data.max_students
      });
      return {
        status: HttpStatus.OK,
        data: {
          success: true,
          message: "Update class success"
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
      const classes = await this.classRepository.find({
        where: {
          name: ILike(`%${keyword}%`),
          status:true
        },
        relations: ['course','teacher','student'],
        skip: skip,
        take: take
      });

      const total = await this.classRepository.count({
        where: {name: ILike(`%${keyword}%`),
          status:true
        },
      })

      return {
        status: HttpStatus.OK,
        data: {data:classes,total}
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

  async delete(id: number) {
    try {
      const findClass = await this.classRepository.findOne({ where: { id: id } });
      if (!findClass) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Class with offer ID not found."
          }
        };

      }
      const deleteCourse = await this.classRepository.update(Number(id), { status: true });
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Delete class success"
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
