import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class UpdateClassMembersDto {

    @IsNumber()
    @IsOptional()
    class_id: number

    @IsNumber()
    @IsOptional()
    student_id: number;
}