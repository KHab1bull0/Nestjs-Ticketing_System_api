import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { OrderModule } from './order/order.module';
import { EventModule } from './events/event.module';
import { PaymentModule } from './payment/payment.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DIALECT as any,
      host: process.env.HOST,
      port: parseInt(process.env.PORT_DB, 10),
      username: 'postgres',
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadModels: process.env.AUTO_LOAD_MODELS === 'true',
      synchronize: process.env.SYNCHRONIZE === 'true',
      logging:false
    }),
    SequelizeModule.forFeature([]),
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
