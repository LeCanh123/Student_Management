import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Class } from "src/modules/class/database/class.entity"
import { Course } from "src/modules/course/database/course.entity"
@Entity()
export class ModuleCourse {
    @PrimaryGeneratedColumn()
    id: number

    //Tên môn học
    @Column({ length: 100, })
    name: string

    //Thời gian đào tạo
    @Column()
    duration: number

    @Column({ default: true })
    status: boolean;

    @ManyToOne(() => Course, (course) => course.modulecourse)
    course: Course
}
