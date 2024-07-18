import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuid } from 'uuid'
import { EventService } from 'src/event/event.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket)
    private readonly ticketModel: typeof Ticket,
    private readonly eventService: EventService
  ) { }
  async create(createTicketDto: CreateTicketDto) {
    const { eventId } = createTicketDto;
    const event = await this.eventService.findOne(eventId)

    if (!event) {
      throw new NotFoundException("Event not found")
    }

    const id: string = uuid();
    const ticket = new this.ticketModel({ id, ...createTicketDto })
    ticket.save()
    return ticket;
  }

  findAll() {
    return this.ticketModel.findAll();
  }

  async findOne(id: string) {
    const ticket = await this.ticketModel.findOne({ where: { id: id } });
    if (!ticket) {
      throw new NotFoundException("Ticket not found");
    }

    return ticket
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {

    const { eventId } = updateTicketDto;
    const event = await this.eventService.findOne(eventId)

    if (!event) {
      throw new NotFoundException("Event not found")
    }

    const [numberOfAffectedRows, [updatedEvent]] = await this.ticketModel.update(
      { ...updateTicketDto },
      { where: { id: id }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return updatedEvent;
  }

  async remove(id: string) {
    const event = await this.ticketModel.destroy({ where: { id: id } });
    if (event == 0) {
      throw new NotFoundException("Ticket not found")
    }

    if (event == 1) {
      return { message: "Ticket deleted" }
    }
  }
}
