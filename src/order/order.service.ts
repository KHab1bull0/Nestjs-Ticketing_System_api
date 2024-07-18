import { Injectable, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { User } from 'src/auth/entities/auth.entity';
import { AuthService } from 'src/auth/auth.service';
import { v4 as uuid } from 'uuid'
import { TicketService } from 'src/ticket/ticket.service';


@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    private readonly userService: AuthService,
    private readonly ticketService: TicketService
  ) { }


  async create(createOrderDto: CreateOrderDto) {
    const { userId, tickets } = createOrderDto;

    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new NotFoundException("User not found")
    }


    for (let i = 0; i < tickets.length; i++) {
      const ticket = await this.ticketService.findOne(tickets[i]);

      if(!ticket){
        throw new NotFoundException(`Ticket by id ${tickets[i]} not found`)
      }
    }

    const id = uuid()
    const event = new this.orderModel({ id, ...createOrderDto });
    event.save()
    return event;
  }

  findAll() {
    return this.orderModel.findAll();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findOne({ where: { id: id } });

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return order
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const { userId } = updateOrderDto;

    const user = await this.userService.findOne(userId)
    if(!user){
      throw new NotFoundException("Order not found")
    }

    const order = await this.orderModel.findOne({ where: {id: id}})
    if(!order){
      throw new NotFoundException("Order not found")
    }
    const [numberOfAffectedRows, [updatedOrder]] = await this.orderModel.update(
      { ...updateOrderDto },
      { where: { id: id }, returning: true }
    );
    return updatedOrder;
  }

  async remove(id: string) {
    const event = await this.orderModel.destroy({ where: { id: id } });
    if (event == 0) {
      throw new NotFoundException("Order not found")
    }

    if (event == 1) {
      return { message: "Order deleted" }
    }
  }
}
