import { User } from "src/modules/user/database/user.entity"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"

export enum RoleName {
    ADMIN = "ADMIN",
    SUB_ADMIN = "SUB_ADMIN",
    TEACHER = "TEACHER"
}

export const CreateRole = [
    { role_name: RoleName.ADMIN },
    { role_name: RoleName.SUB_ADMIN },
    { role_name: RoleName.TEACHER }
]



@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: RoleName, default: RoleName.TEACHER })
    role_name: RoleName

    @ManyToMany(() => User, (user) => user.role)
    @JoinTable()
    user: User[]
}
