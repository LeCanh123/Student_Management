import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    duration:number

    @IsDate()
    start_date: Date;

    @IsDate()
    end_date: Date;
}