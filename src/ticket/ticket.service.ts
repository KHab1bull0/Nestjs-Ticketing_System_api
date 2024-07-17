import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuid } from 'uuid'

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket)
    private readonly ticketModel: typeof Ticket
  ) { }
  async create(createTicketDto: CreateTicketDto) {

    const id: string = uuid();
    const ticket = new this.ticketModel({ id, ...createTicketDto })
    return ticket;
  }

  findAll() {
    return this.ticketModel.findAll();
  }

  findOne(id: number) {
    return this.ticketModel.findOne({ where: { id: id } });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const [numberOfAffectedRows, [updatedEvent]] = await this.ticketModel.update(
      { ...updateTicketDto },
      { where: { id: id }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return updatedEvent;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
