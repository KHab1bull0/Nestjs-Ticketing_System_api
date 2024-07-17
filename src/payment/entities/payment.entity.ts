import { Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Order } from '../../order/entities/order.entity';

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID })
  orderId: string;

  @Column({ type: DataType.DECIMAL })
  amount: number;

  @Column({ type: DataType.ENUM('credit_card', 'bank_transfer', 'paypal') })
  method: string;

  @Column({ type: DataType.ENUM('pending', 'completed', 'failed') })
  status: string;

  @Column({ type: DataType.STRING })
  transactionId: string;
}
