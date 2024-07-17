import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
