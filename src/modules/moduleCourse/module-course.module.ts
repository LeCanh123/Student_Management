import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleCourse } from './database/module-course.entity';
import { ModuleCourseController } from './module-course.controller';
import { ModuleCourseService } from './module-course.service';
require('dotenv').config();
@Module({
  imports: [TypeOrmModule.forFeature([ModuleCourse])],
  controllers: [ModuleCourseController],
  providers: [ModuleCourseService],
  exports: [ModuleCourseService],
})
export class ModuleCourseModule { }
