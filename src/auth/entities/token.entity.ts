import { Table, Model, Column, DataType } from "sequelize-typescript";


@Table({ tableName: 'tokens' })
export class Token extends Model {
    @Column({ type: DataType.STRING })
    email: string;

    @Column({ type: DataType.STRING })
    rToken: string;
}
