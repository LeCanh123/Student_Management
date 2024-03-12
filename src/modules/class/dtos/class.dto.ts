import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class ClassDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    teacher: string;

    @IsNumber()
    @IsNotEmpty()
    max_students:number

    @IsNumber()
    @IsNotEmpty()
    course_id: number;

    @IsNumber()
    @IsOptional()
    teacher_id: number;

    @IsNumber()
    @IsOptional()
    student_id: number;
}