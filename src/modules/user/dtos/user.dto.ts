import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export default class UserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    username: string;


    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;


    @IsString()
    @MaxLength(100)
    fullname: string;

    @IsString()
    @IsOptional()
    avatar: string;

    @IsString()
    @MaxLength(15)
    phone: string;

    @IsOptional()
    role: string;

}