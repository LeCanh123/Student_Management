import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export default class UpdateUserDto {
    @IsString()
    @IsOptional()
    @MaxLength(100)
    username: string;


    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @MinLength(6)
    @IsOptional()
    password: string;


    @IsString()
    @MaxLength(100)
    @IsOptional()
    fullname: string;

    @IsOptional()
    avatar: any;

    @IsString()
    @MaxLength(15)
    @IsOptional()
    phone: string;

}