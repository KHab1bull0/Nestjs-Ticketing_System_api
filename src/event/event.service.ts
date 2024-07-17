import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class EventService {

  constructor(
    @InjectModel(Event)
    private readonly eventModel: typeof Event,
  ) { }

  async create(createEventDto: CreateEventDto) {
    const { name, description, location, totalTickets, date, time } = createEventDto;
    const event = await this.eventModel.findOne({ where: { name: name } })
    if (event) {
      throw new BadRequestException("Event already exists");
    }
    const dates = new Date(date)


    const id: string = uuid();
    const newEvent = new this.eventModel({ id, ...createEventDto })

    return newEvent.save();
  }

  findAll() {
    return this.eventModel.findAll();
  }

  findOne(id: string) {
    return this.eventModel.findOne({ where: { id: id } });
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const [numberOfAffectedRows, [updatedEvent]] = await this.eventModel.update(
      { ...updateEventDto },
      { where: { id }, returning: true }
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return updatedEvent;
  }

  async remove(id: string) {
    const event = await this.eventModel.destroy({ where: { id: id } });
    if (event == 0) {
      return { message: `Event don't deleted or not exists` }
    }

    if (event == 1) {
      return { message: "Event deleted" }
    }
    return event
  }
}
