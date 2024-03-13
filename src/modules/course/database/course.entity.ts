import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Class } from "src/modules/class/database/class.entity"
import { ModuleCourse } from "src/modules/moduleCourse/database/modulecourse.entity"
@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    //Tên khoá học
    @Column({ length: 100, })
    name: string

    @Column()
    description: string

    //Thời gian đào tạo
    @Column()
    duration: number

    @Column()
    start_date: Date

    @Column()
    end_date: Date

    @Column({ default: true })    
    status:Boolean

    @OneToMany(() => Class,(mainclass)=>mainclass.course)
    class: Class[]

    @OneToMany(() => ModuleCourse,(modulecourse)=>modulecourse.course)
    modulecourse: ModuleCourse[]
}
