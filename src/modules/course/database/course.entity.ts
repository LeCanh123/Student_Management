import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Class } from "src/modules/class/database/class.entity"
@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    duration: number

    @Column()
    start_date: Date

    @Column()
    end_date: Date

    @Column({ default: false })    
    is_delete:Boolean

    @OneToMany(() => Class,(mainclass)=>mainclass.course)
    class: Class[]
}
