import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}
