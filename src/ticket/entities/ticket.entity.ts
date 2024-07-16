import { Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Event } from 'src/event/entities/event.entity';

@Table({ tableName: 'tickets' })
export class Ticket extends Model<Ticket> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
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

  @Column({ type: DataType.STRING })
  currency: string;

  @Column({ type: DataType.STRING })
  seatNumber: string;

  @Column({ type: DataType.ENUM('available', 'booked', 'sold') })
  status: string;
}
