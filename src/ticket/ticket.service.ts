import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket)
    private readonly ticketModel: typeof Ticket
  ) { }
  async create(createTicketDto: CreateTicketDto) {
    const ticket = new this.ticketModel({ ...createTicketDto })
    return ticket;
  }

  findAll() {
    return `This action returns all ticket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
