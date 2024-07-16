import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { OrderModule } from './order/order.module';
import { EventModule } from './event/event.module';
import { PaymentModule } from './payment/payment.module';
import { User } from './user/entities/user.entity';
import { Ticket } from './ticket/entities/ticket.entity';
import { Order } from './order/entities/order.entity';
import { Payment } from './payment/entities/payment.entity';
import { Event } from './event/entities/event.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Event, Ticket, Order, Payment],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User, Event, Ticket, Order, Payment]),
    AuthModule,
    UserModule,
    TicketModule,
    OrderModule,
    EventModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
