import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @Column({
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING, unique: true })
  username: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column(
    {
      type: DataType.ENUM('user', 'admin', 'organizer'),
      defaultValue: "user"
    }
  )
  role: string;

  @Column(
    {
      type: DataType.ENUM('active', 'inactive'),
      defaultValue: "inactive"
    }
  )
  status: string;
}
