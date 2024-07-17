import { Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Event } from '../../event/entities/event.entity';

@Table({ tableName: 'tickets' })
export class Ticket extends Model<Ticket> {
  @Column({
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Event)
  @Column({ type: DataType.UUID })
  eventId: string;

  @Column({ type: DataType.ENUM('standard', 'vip', 'student', 'senior') })
  type: string;

  @Column({ type: DataType.DECIMAL })
  price: number;

  @Column({ type: DataType.ENUM('USD', 'EUR', 'UZS') })
  currency: string;

  @Column({ type: DataType.STRING })
  seatNumber: string;

  @Column({ type: DataType.ENUM('available', 'booked', 'sold') })
  status: string;
}
