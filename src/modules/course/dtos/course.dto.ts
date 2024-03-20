import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class CourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
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