import { Class } from "src/modules/class/database/class.entity"
import { Course } from "src/modules/course/database/course.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number

    @Column()    
    name: string

    @Column()
    dob: Date

    @Column({ unique: true })
    email: string

    @Column({ unique: true })    
    phone:number

    @Column()    
    address:string

    @Column({ default: false })    
    is_delete:Boolean

    @OneToMany(() => Class,(mainclass)=>mainclass.teacher)
    class: Class[]
} 
