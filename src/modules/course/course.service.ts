import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './database/course.entity';
import CourseDto from './dtos/course.dto';
import UpdateCourseDto from './dtos/update-course.dto';


@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) { }
  async getAll() {
    try {
      const data = await this.courseRepository.find({ where: { status: true }, relations: ['class', 'modulecourse'] });
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
      const data = await this.courseRepository.find({ where: { id: id }, relations: ['class', 'modulecourse'] });
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
    try {
      const newCourse = await this.courseRepository.save(course);
      return {
        status: HttpStatus.CREATED,
        data: {
          success: true,
          message: "Create new course success"
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

  async update(course: UpdateCourseDto, id: number) {
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
      const updateCourse = await this.courseRepository.update(Number(id), course);
      return {
        status: HttpStatus.CREATED,
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

  async search(keyword: string) {
    try {
      const courses = await this.courseRepository
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.class', 'class')
        .leftJoinAndSelect('course.modulecourse', 'modulecourse')
        .where('course.name LIKE :keyword', { keyword: `%${keyword}%` })
        .getMany();

      return {
        status: HttpStatus.OK,
        data: courses
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
