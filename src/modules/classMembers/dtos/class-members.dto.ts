import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class ClassMembersDto {

    @IsNumber()
    @IsOptional()
    student_id: number;

    @IsNumber()
    @IsOptional()
    class_id: number;
}