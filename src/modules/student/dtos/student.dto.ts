import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { Type } from 'class-transformer';

export default class StudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    @Type(() => Date)
    dob: Date;

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    address: string;
}