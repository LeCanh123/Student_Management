import { Course } from "src/modules/course/database/course.entity"
import { Teacher } from "src/modules/teacher/database/teacher.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })    
    name: string

    @Column()
    max_students: number

    @Column({ default: false })    
    is_delete:Boolean

    @ManyToOne(() => Course, (course) => course.class)
    course: Course

    @ManyToOne(() => Teacher, (teacher) => teacher.class)
    teacher: Teacher
} 