import { Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @Column({ type: DataType.ARRAY(DataType.UUID) })
  tickets: string[];

  @Column({ type: DataType.DECIMAL })
  totalAmount: number;

  @Column({ type: DataType.STRING })
  currency: string;

  @Column({ type: DataType.ENUM('pending', 'completed', 'cancelled') })
  status: string;
}
