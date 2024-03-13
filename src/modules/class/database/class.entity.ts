import { Course } from "src/modules/course/database/course.entity"
import { Student } from "src/modules/student/database/student.entity"
import { Teacher } from "src/modules/teacher/database/teacher.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number

    @Column()    
    name: string

    @Column()
    max_students: number

    @Column({ default: true })    
    status:Boolean

    @ManyToOne(() => Course, (course) => course.class)
    course: Course

    @ManyToOne(() => Teacher, (teacher) => teacher.class)
    teacher: Teacher

    @OneToMany(() => Student, (student) => student.class)
    student: Student[]
} 
