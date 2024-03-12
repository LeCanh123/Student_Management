import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString,IsEmail } from "class-validator";

export default class UpdateStudentDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    dod: Date;

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