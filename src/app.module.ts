import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';
import { OrderModule } from './order/order.module';
import { EventModule } from './event/event.module';
import { PaymentModule } from './payment/payment.module';
import { MailerModule } from './mailer/mailer.module';
import { User } from './auth/entities/auth.entity';
import { Ticket } from './ticket/entities/ticket.entity';
import { Order } from './order/entities/order.entity';
import { Payment } from './payment/entities/payment.entity';
import { Event } from './event/entities/event.entity';
import { Otp } from './auth/entities/otp.entity';
import { Token } from './auth/entities/token.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './middleware/role.guard';
import { AuthGuard } from './middleware/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeORm } from './auth/entities/userTypeOrm..entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadModels: true,
      logging: false
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [UserTypeORm],
    }),
    // SequelizeModule.forFeature([User, Ticket, Order, Payment, Token, Event, Otp]),
    MailerModule,
    TicketModule,
    OrderModule,
    EventModule,
    PaymentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule { }
