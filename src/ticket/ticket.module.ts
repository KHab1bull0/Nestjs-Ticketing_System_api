import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Ticket]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule { }
