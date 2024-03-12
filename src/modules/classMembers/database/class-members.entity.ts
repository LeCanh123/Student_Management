import { Class } from "src/modules/class/database/class.entity"
import { Student } from "src/modules/student/database/student.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class ClassMembers {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Class, (mainclass) => mainclass.class_members)
    class: Class

    @ManyToOne(() => Student, (student) => student.class_members)
    student: Student

    @Column({ default: false })    
    is_delete:Boolean
} 
