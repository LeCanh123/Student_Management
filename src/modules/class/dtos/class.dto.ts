import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
}