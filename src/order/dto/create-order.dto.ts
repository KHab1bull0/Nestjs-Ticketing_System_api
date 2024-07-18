import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, isString } from "class-validator";


export enum Status {
    pending = 'pending',
    completed = 'completed',
    cancelled = 'cancelled'
}

export class CreateOrderDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    userId: string

    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('4', { each: true })
    tickets: string[];
    @IsNotEmpty()
    @IsNumber()
    totalAmount: number

    @IsNotEmpty()
    @IsString()
    currency: string

    @IsString()
    @IsEnum(Status)
    @IsNotEmpty()
    status: string
}



