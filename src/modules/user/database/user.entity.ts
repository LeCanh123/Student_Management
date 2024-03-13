import { Role } from "src/modules/role/database/role.entity"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from "typeorm"


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100, unique: true })
    username: string

    @Column({ length: 255, unique: true })
    email: string

    @Column({ length: 100, })
    fullname: string

    @Column({ default: true })
    status: boolean;

    @Column()
    password: string

    @Column({ nullable: true })
    avatar: string

    @Column({ length: 15,unique: true })
    phone: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated_at: Date;
    
    @ManyToMany(() => Role, (role) => role.user)
    role: Role[]

}
