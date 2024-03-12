import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../course/database/course.entity'; 
import { ClassMembersController } from './class-members.controller'; 
import { ClassMembersService } from './class-members.service'; 
import { ClassMembers } from './database/class-members.entity';
require('dotenv').config();
@Module({
  imports: [TypeOrmModule.forFeature([ClassMembers])],
  controllers: [ClassMembersController],
  providers: [ClassMembersService],
  exports: [ClassMembersService],
})
export class ClassMembersModule {}
