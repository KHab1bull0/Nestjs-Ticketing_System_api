import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { CreateEventDto } from './create-event.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEventDto extends PartialType(CreateEventDto) { }
