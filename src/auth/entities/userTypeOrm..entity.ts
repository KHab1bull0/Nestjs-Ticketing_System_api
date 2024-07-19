import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"



@Entity({ name: "users_typeorm" })
export class UserTypeORm {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', unique: true })
    username: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar', default: "user" })
    role: string;

    @Column({ type: 'varchar', default: "inactive" })
    status: string;

}

