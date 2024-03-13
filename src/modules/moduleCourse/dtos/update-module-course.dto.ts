import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString,IsEmail } from "class-validator";

export default class UpdateModuleCourseDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    duration:number

    @IsNumber()
    @IsOptional()
    course_id:number
}