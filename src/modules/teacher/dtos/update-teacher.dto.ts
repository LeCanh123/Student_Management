import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString,IsEmail } from "class-validator";

export default class UpdateTeacherDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    dob: Date;

    @IsEmail()
    @IsOptional()
    email:string

    @IsString()
    @IsOptional()
    phone: string;


    @IsString()
    @IsOptional()
    address: string;
}