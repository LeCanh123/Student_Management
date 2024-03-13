import { Class } from "src/modules/class/database/class.entity"
import { Course } from "src/modules/course/database/course.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()    
    name: string

    @Column({ default: true })
    status: boolean;

    //Birth day
    @Column()
    dob: Date

    @Column({ length: 15,unique: true })
    phone: string

    @Column()    
    address:string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated_at: Date;

    @ManyToOne(() => Class, (mainclass) => mainclass.student)
    class: Class

} 
