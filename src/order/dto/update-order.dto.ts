import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export enum Status {
    pending = 'pending',
    completed = 'completed',
    cancelled = 'cancelled'
}

export class UpdateOrderDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    userId: string

    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('4', { each: true })
    @IsOptional()
    tickets: string[];

    @IsNumber()
    @IsOptional()
    totalAmount: number

    @IsString()
    @IsOptional()
    currency: string

    @IsString()
    @IsEnum(Status)
    @IsOptional()
    status: string
}