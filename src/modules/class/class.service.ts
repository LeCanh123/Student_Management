import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getAll() {
    try {
      const data = await this.classRepository.find({ where: { is_delete: false } ,
        relations: ['course','teacher'] 
      });
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
      const newClass = await this.classRepository.save({
        ...class_data,
        course: { id: class_data.course_id },
        teacher: { id: class_data.teacher_id }
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
        teacher: {id:class_data.teacher_id},
        course: { id: class_data.course_id },
        max_students: class_data.max_students
      });
      return {
        status: HttpStatus.CREATED,
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

  async search(keyword: string) {
    try {
      const classes = await this.classRepository
        .createQueryBuilder('class')
        .where('class.name LIKE :keyword', { keyword: `%${keyword}%` })
        .getMany();

      return {
        status: HttpStatus.OK,
        data: classes
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
      const deleteCourse = await this.classRepository.update(Number(id), { is_delete: true });
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
