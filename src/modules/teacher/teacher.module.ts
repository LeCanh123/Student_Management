import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../course/database/course.entity'; 
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher } from './database/teacher.entity';
require('dotenv').config();
@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
