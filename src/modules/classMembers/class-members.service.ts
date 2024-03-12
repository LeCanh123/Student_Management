import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassMembers } from './database/class-members.entity'; 
import ClassMembersDto from './dtos/class-members.dto';
import UpdateClassMembersDto from './dtos/update-class-members.dto';


@Injectable()
export class ClassMembersService {
  constructor(
    @InjectRepository(ClassMembers)
    private readonly classMembersRepository: Repository<ClassMembers>,
  ) { }

  async getAll() {
    try {
      const data = await this.classMembersRepository.find({ where: { is_delete: false },
        relations: ['student','class'] 
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
      const data = await this.classMembersRepository.find({ where: { id: id },  
        relations: ['student','class']  
      });
      if (!data || data?.length == 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Class Member with offer ID not found."
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

  async create(class_member_data: ClassMembersDto) {
    try {
      const newClass = await this.classMembersRepository.save({
        class: { id: class_member_data.class_id },
        student: { id: class_member_data.student_id },
      });
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Add class member success"
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

  async update(class_member_data: UpdateClassMembersDto, id: number) {
    try {
      const findClassMember = await this.classMembersRepository.findOne({ where: { id: id } });
      if (!findClassMember) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Class member with offer ID not found."
          }
        };
      }
      const updateClassMembers = await this.classMembersRepository.update(Number(id), {
        class: { id: class_member_data.class_id },
        student: { id: class_member_data.student_id },
      });
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Update class member success"
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
      const classMembers = await this.classMembersRepository
        .createQueryBuilder('classmembers')
        .where('classmembers.student_id LIKE :keyword', { keyword: `%${keyword}%` })
        .getMany();

      return {
        status: HttpStatus.OK,
        data: classMembers
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
      const findClass = await this.classMembersRepository.findOne({ where: { id: id } });
      if (!findClass) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: {
            error: "Not Found",
            message: "Class member with offer ID not found."
          }
        };

      }
      const deleteCourse = await this.classMembersRepository.update(Number(id), { is_delete: true });
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
