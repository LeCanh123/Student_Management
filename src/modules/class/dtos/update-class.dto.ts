import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class UpdateClassDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    teacher_id: number;

    @IsNumber()
    @IsOptional()
    max_students: number

    @IsNumber()
    @IsOptional()
    course_id: number;
}