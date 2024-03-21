import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { Type } from 'class-transformer';

export default class ModuleCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    duration:any

    course_id:any
}