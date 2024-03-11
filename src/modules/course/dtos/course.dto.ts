import { Type } from "class-transformer";
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
    @Type(() => Date)
    start_date: Date;

    @IsDate()
    @Type(() => Date)
    end_date: Date;
}