import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column()
    @Column({ unique: true })
    email: string

    @Column()
    role: number
}
