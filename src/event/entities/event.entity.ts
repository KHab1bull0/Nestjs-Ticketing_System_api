import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'events' })
export class Event extends Model<Event> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.STRING })
  location: string;

  @Column({ type: DataType.DATE })
  date: Date;

  @Column({ type: DataType.TIME })
  time: Date;

  @Column({ type: DataType.INTEGER })
  totalTickets: number;

  @Column({ type: DataType.INTEGER })
  availableTickets: number;
}
