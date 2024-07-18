import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { OrderService } from 'src/order/order.service';
import { Payment } from './entities/payment.entity';
import { v4 as uuid } from 'uuid';
import { AuthService } from 'src/auth/auth.service';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class PaymentService {

  constructor(
    @InjectModel(Payment)
    private readonly paymentModel: typeof Payment,
    private readonly orderService: OrderService,
    private readonly userService: AuthService
  ) { }

  async create(createPaymentDto: CreatePaymentDto) {
    const { orderId } = createPaymentDto;

    const order = await this.orderService.findOne(orderId);

    if (!order) {
      throw new NotFoundException("Order not found")
    }
    const id = uuid()
    const payment = new this.paymentModel({ id, ...createPaymentDto });
    payment.save()
    return payment
  }

  findAll() {
    return this.paymentModel.findAll();
  }

  async findOne(id: string) {
    const payment = await this.paymentModel.findOne({ where: { id: id } });

    if (!payment) {
      throw new NotFoundException("Payment not found");
    }

    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const { orderId } = updatePaymentDto;

    const order = await this.orderService.findOne(orderId);

    if (!order) {
      throw new NotFoundException("Order not found")
    }

    const [numberOfAffectedRows, [updatedPayment]] = await this.paymentModel.update(
      { ...updatePaymentDto },
      { where: { id: id }, returning: true }
    );
    return updatedPayment;
  }

  async remove(id: string) {
    const event = await this.orderService.remove(id);

    return { message: "Payment deleted" }
  }
}
