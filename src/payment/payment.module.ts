import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { OrderModule } from 'src/order/order.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    OrderModule,
    AuthModule,
    SequelizeModule.forFeature([Payment])
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
