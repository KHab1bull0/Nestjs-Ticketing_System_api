import { Table, Model, Column, DataType } from "sequelize-typescript";


@Table({ tableName: 'otps' })
export class Otp extends Model {
    @Column({ type: DataType.STRING })
    email: string;

    @Column({ type: DataType.STRING })
    username: string;

    @Column({ type: DataType.STRING })
    otp: string;
}
