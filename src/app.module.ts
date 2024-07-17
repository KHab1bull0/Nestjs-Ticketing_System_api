import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';
import { OrderModule } from './order/order.module';
import { EventModule } from './event/event.module';
import { PaymentModule } from './payment/payment.module';
import { User } from './auth/entities/auth.entity';
import { Ticket } from './ticket/entities/ticket.entity';
import { Order } from './order/entities/order.entity';
import { Payment } from './payment/entities/payment.entity';
import { Event } from './event/entities/event.entity';
import { MailerModule } from './mailer/mailer.module';


@Module({
  imports: [
    MailerModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      autoLoadModels: true,
      synchronize: true,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      logging:false
    }),
    SequelizeModule.forFeature([User, Ticket, Event, Payment, Order]),
    TicketModule,
    OrderModule,
    EventModule,
    PaymentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
