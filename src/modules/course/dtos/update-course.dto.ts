import { IsDate, IsNotEmpty, IsNumber, IsString ,IsOptional} from "class-validator";

export default class UpdateCourseDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    duration:number

    @IsDate()
    @IsOptional()
    start_date: Date;

    @IsDate()
    @IsOptional()
    end_date: Date;
}