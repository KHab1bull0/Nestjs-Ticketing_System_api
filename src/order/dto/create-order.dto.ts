import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";



export enum Status {
    pending = 'active',
    completed = 'inactive',
    cancelled = 'cancelled'
}

export class CreateOrderDto {
    @IsNumber()
    @IsUUID()
    @IsNotEmpty()
    userid: string

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



