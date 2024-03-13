import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../course/database/course.entity'; 
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { Class } from './database/class.entity';
import { Student } from '../student/database/student.entity';
require('dotenv').config();
@Module({
  imports: [TypeOrmModule.forFeature([Class,Student])],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}
