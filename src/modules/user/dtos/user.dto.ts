import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

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
    @MaxLength(15)
    phone: string;

}